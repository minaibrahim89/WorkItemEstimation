using System.Linq.Expressions;
using Azure;
using Azure.Data.Tables;
using Microsoft.Extensions.Logging;

namespace WorkItemEstimation.AzureFunction;

public class StorageClient
{
    private readonly ILogger<StorageClient> _logger;
    private readonly string _connectionString;
    private readonly Lazy<TableClient> _roomsClient;
    private readonly Lazy<TableClient> _votersClient;
    private readonly Lazy<TableClient> _votesClient;

    public StorageClient(ILogger<StorageClient> logger)
    {
        _logger = logger;
        _connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGETABLE_CONNECTIONSTRING")!;
        _roomsClient = new(() => new TableClient(_connectionString, "Rooms"));
        _votersClient = new(() => new TableClient(_connectionString, "Voters"));
        _votesClient = new(() => new TableClient(_connectionString, "Votes"));
    }

    public async Task AddOrUpdate<T>(TableEntity entity)
        where T : class
    {
        var client = GetTableClient<T>();
        var response = await client.UpsertEntityAsync(entity);

        if (response.IsError)
        {
            _logger.LogError("Storage Upsert failed for {entityType}: {errorCode} - {reason}",
                client.Name, response.Status, response.ReasonPhrase);

            throw new RequestFailedException(response);
        }
    }

    public async Task Update<T>(TableEntity entity)
        where T : class
    {
        var client = GetTableClient<T>();
        var response = await client.UpdateEntityAsync(entity, ETag.All);

        if (response.IsError)
        {
            _logger.LogError("Storage Update failed for {entityType}: {errorCode} - {reason}",
                client.Name, response.Status, response.ReasonPhrase);

            throw new RequestFailedException(response);
        }
    }

    public async Task<bool> Exists<T>(string partitionKey, string rowKey)
    {
        var client = GetTableClient<T>();
        var response = await client.GetEntityIfExistsAsync<TableEntity>(partitionKey, rowKey);

        return response.HasValue;
    }

    public async Task<TableEntity?> Get<T>(string partitionKey, string rowKey)
    {
        var client = GetTableClient<T>();
        var response = await client.GetEntityIfExistsAsync<TableEntity>(partitionKey, rowKey);

        return response.HasValue ? response.Value : null;
    }

    public async Task DeleteAll<T>(Expression<Func<TableEntity, bool>> filter)
    {
        var client = GetTableClient<T>();
        var query = client.QueryAsync(filter);
        var toDelete = await query.AsPages()
                                  .SelectMany(p => (IAsyncEnumerable<TableEntity>)p.Values)
                                  .ToListAsync();

        var deleteActions = toDelete.Select(e => new TableTransactionAction(TableTransactionActionType.Delete, e));
        await client.SubmitTransactionAsync(deleteActions);
    }

    private TableClient GetTableClient<T>()
    {
        if (typeof(T) == typeof(Room))
            return _roomsClient.Value;

        if (typeof(T) == typeof(Voter))
            return _votersClient.Value;

        if (typeof(T) == typeof(Vote))
            return _votesClient.Value;

        throw new InvalidOperationException($"No client is available for type {typeof(T).Name}");
    }
}

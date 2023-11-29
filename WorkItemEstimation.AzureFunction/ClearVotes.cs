using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace WorkItemEstimation.AzureFunction;

public class ClearVotes(ILoggerFactory loggerFactory, StorageClient storageClient)
{
    private readonly ILogger _logger = loggerFactory.CreateLogger<ClearVotes>();
    private readonly StorageClient _storageClient = storageClient;

    [Function("ClearVotes")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "delete", Route = "rooms/{roomId}/votes")] HttpRequestData req,
        string roomId)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        HttpResponseData response;

        if (!await _storageClient.Exists<Room>(roomId, roomId))
        {
            response = req.CreateResponse(HttpStatusCode.NotFound);
            await response.WriteStringAsync("Room does not exist");
            return response;
        }

        await _storageClient.DeleteAll<Vote>(e => e.PartitionKey == roomId);

        return req.CreateResponse(HttpStatusCode.NoContent);
    }
}

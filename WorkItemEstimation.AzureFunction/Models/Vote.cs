using Azure.Data.Tables;

namespace WorkItemEstimation.AzureFunction;

public class Vote
{
    private readonly Lazy<TableEntity> _tableEntity;

    public Vote(string roomId, string voterId, string value)
    {
        RoomId = roomId;
        VoterId = voterId;
        Value = value;

        _tableEntity = new(() =>
            new TableEntity(roomId, voterId)
            {
                ["Value"] = Value
            });
    }

    public string RoomId { get; }
    public string VoterId { get; }
    public string Value { get; }

    public TableEntity ToEntity() => _tableEntity.Value;
}

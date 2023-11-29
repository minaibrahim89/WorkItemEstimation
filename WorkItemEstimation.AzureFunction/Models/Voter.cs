using Azure.Data.Tables;

namespace WorkItemEstimation.AzureFunction;

public class Voter
{
    private readonly Lazy<TableEntity> _tableEntity;

    public Voter(string roomId, string name, bool isAdmin = false)
    {
        Id = Guid.NewGuid().ToString();
        RoomId = roomId;
        Name = name;
        IsAdmin = isAdmin;

        _tableEntity = new(() => new(roomId, Id)
        {
            ["Name"] = Name,
            ["IsAdmin"] = IsAdmin
        });
    }

    public string Id { get; }
    public string RoomId { get; }
    public string Name { get; }
    public bool IsAdmin { get; }

    public TableEntity ToEntity() => _tableEntity.Value;
}

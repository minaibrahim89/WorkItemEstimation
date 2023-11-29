using System.ComponentModel.DataAnnotations;
using Ardalis.GuardClauses;
using Azure.Data.Tables;

namespace WorkItemEstimation.AzureFunction;

public class Room
{
    private readonly Lazy<TableEntity> _tableEntity;

    public Room(string name)
    {
        Guard.Against.NullOrWhiteSpace(name);

        Name = name;
        Id = Guid.NewGuid().ToString();

        _tableEntity = new(() => new(Id, Id)
        {
            ["Name"] = Name,
            ["VotesRevealed"] = VotesRevealed
        });
    }

    [Required]
    public string Id { get; init; }
    public string Name { get; set; }
    public bool VotesRevealed { get; set; }

    public TableEntity ToEntity() => _tableEntity.Value;

    public static Room FromEntity(TableEntity entity) => new((string)entity["Name"])
    {
        Id = entity.RowKey,
        VotesRevealed = (bool)entity["VotesRevealed"]
    };
}

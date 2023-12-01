using System.ComponentModel.DataAnnotations;
using Ardalis.GuardClauses;
using Azure.Data.Tables;

namespace WorkItemEstimation.AzureFunction;

public class Room
{
    private readonly Lazy<TableEntity> _tableEntity;

    public Room(string name, string[] allowedValues)
    {
        Guard.Against.NullOrWhiteSpace(name);
        Guard.Against.NullOrEmpty(allowedValues);

        Name = name;
        AllowedValues = allowedValues;
        Id = Guid.NewGuid().ToString();

        _tableEntity = new(() => new(Id, Id)
        {
            ["Name"] = Name,
            ["AllowedValues"] = string.Join("\n", AllowedValues),
            ["VotesRevealed"] = VotesRevealed
        });
    }

    [Required]
    public string Id { get; init; }
    public string Name { get; set; }
    public bool VotesRevealed { get; set; }
    public string[] AllowedValues { get; set; }

    public TableEntity ToEntity() => _tableEntity.Value;

    public static Room FromEntity(TableEntity entity)
    {
        var name = (string)entity["Name"];
        var allowedValues = (string)entity["AllowedValues"];

        return new(name, allowedValues.Split("\n"))
        {
            Id = entity.RowKey,
            VotesRevealed = (bool)entity["VotesRevealed"]
        };
    }
}

using System.ComponentModel.DataAnnotations;

namespace WorkItemEstimation.AzureFunction;

public class VoteRequest
{
    [Required]
    public string RoomId { get; set; } = "";

    [Required]
    public string VoterId { get; set; } = "";

    [Required]
    public string Value { get; set; } = "";
}

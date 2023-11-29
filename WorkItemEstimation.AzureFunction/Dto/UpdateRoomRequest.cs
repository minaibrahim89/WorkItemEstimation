using System.ComponentModel.DataAnnotations;

namespace WorkItemEstimation.AzureFunction;

public class UpdateRoomRequest
{
    [Required]
    public string RoomId { get; set; } = "";

    public bool VotesRevealed { get; set; }
}

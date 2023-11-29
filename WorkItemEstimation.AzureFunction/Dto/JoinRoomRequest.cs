using System.ComponentModel.DataAnnotations;

namespace WorkItemEstimation.AzureFunction;

public class JoinRoomRequest
{
    [Required]
    public string RoomId { get; set; } = "";

    [Required]
    public string UserName { get; set; } = "";

    public bool AsAdmin { get; set; }
}

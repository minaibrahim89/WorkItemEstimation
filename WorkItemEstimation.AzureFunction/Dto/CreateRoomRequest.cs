using System.ComponentModel.DataAnnotations;

namespace WorkItemEstimation.AzureFunction;

public class CreateRoomRequest
{
    [Required]
    public string Name { get; init; } = "";
}

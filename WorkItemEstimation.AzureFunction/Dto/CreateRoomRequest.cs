using System.ComponentModel.DataAnnotations;

namespace WorkItemEstimation.AzureFunction;

public class CreateRoomRequest
{
    [Required]
    public string Name { get; set; } = "";

    [Required, MinLength(2)]
    public string[] AllowedValues { get; set; } = [];
}

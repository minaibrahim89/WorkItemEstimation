using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Functions.Worker.Http;

namespace WorkItemEstimation.AzureFunction;

internal static class HttpRequestDataExtensions
{
    public static async Task<T?> ReadRequestAsync<T>(this HttpRequestData req, Action<T>? customInit = null)
    {
        try
        {
            var request = await req.ReadFromJsonAsync<T>();

            if (request == null)
                return default;

            customInit?.Invoke(request);
            ValidateRequest(request);

            return request;
        }
        catch
        {
            return default;
        }
    }

    private static void ValidateRequest(object request)
    {
        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(request, new(request), validationResults, true);

        if (!isValid)
            throw new ValidationException(string.Join("\n", validationResults.Select(r => r.ErrorMessage)));
    }
}

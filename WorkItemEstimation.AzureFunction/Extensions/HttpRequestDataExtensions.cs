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

            if (request is null)
                return default;

            customInit?.Invoke(request);
            Validator.ValidateObject(request, new(request));
            return request;
        }
        catch
        {
            return default;
        }
    }
}

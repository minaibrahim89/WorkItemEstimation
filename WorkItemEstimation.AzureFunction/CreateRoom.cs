using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using WorkItemEstimation.AzureFunction;

namespace BCI.WorkItemEstimation;

public class CreateRoom(ILoggerFactory loggerFactory, StorageClient storageClient)
{
    private readonly ILogger _logger = loggerFactory.CreateLogger<CreateRoom>();
    private readonly StorageClient _storageClient = storageClient;

    [Function("CreateRoom")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = "rooms")] HttpRequestData req)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        var createRoomRequest = await req.ReadRequestAsync<CreateRoomRequest>();

        if (createRoomRequest is null)
            return req.CreateResponse(HttpStatusCode.BadRequest);

        var room = new Room(createRoomRequest.Name);
        await _storageClient.AddOrUpdate<Room>(room.ToEntity());

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(room);

        return response;
    }
}

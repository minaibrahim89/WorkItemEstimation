using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace WorkItemEstimation.AzureFunction;

public class UpdateRoom(ILoggerFactory loggerFactory, StorageClient storageClient)
{
    private readonly ILogger _logger = loggerFactory.CreateLogger<UpdateRoom>();
    private readonly StorageClient _storageClient = storageClient;

    [Function("UpdateRoom")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "patch", Route = "rooms/{roomId}")] HttpRequestData req,
        string roomId)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        var changeVisibilityRequest = await req.ReadRequestAsync<UpdateRoomRequest>(r => r.RoomId = roomId);

        if (changeVisibilityRequest is null)
            return req.CreateResponse(HttpStatusCode.BadRequest);

        var roomEntity = await _storageClient.Get<Room>(roomId, roomId);

        HttpResponseData response;

        if (roomEntity is null)
        {
            response = req.CreateResponse(HttpStatusCode.NotFound);
            await response.WriteStringAsync("Room does not exist");
            return response;
        }

        var room = Room.FromEntity(roomEntity);
        room.VotesRevealed = changeVisibilityRequest.VotesRevealed;
        await _storageClient.Update<Room>(room.ToEntity());

        response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(room);

        return response;
    }
}

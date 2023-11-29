using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace WorkItemEstimation.AzureFunction;

public class JoinRoom(ILoggerFactory loggerFactory, StorageClient storageClient)
{
    private readonly ILogger _logger = loggerFactory.CreateLogger<JoinRoom>();
    private readonly StorageClient _storageClient = storageClient;

    [Function("JoinRoom")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = "rooms/{id}/join")] HttpRequestData req, string id)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        var joinRoomRequest = await req.ReadRequestAsync<JoinRoomRequest>(r => r.RoomId = id);

        if (joinRoomRequest is null)
            return req.CreateResponse(HttpStatusCode.BadRequest);

        HttpResponseData response;

        if (!await _storageClient.Exists<Room>(joinRoomRequest.RoomId, joinRoomRequest.RoomId))
        {
            response = req.CreateResponse(HttpStatusCode.NotFound);
            await response.WriteStringAsync("Room does not exist");
            return response;
        }

        var voter = new Voter(joinRoomRequest.RoomId, joinRoomRequest.UserName, joinRoomRequest.AsAdmin);
        await _storageClient.AddOrUpdate<Voter>(voter.ToEntity());

        response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(voter);

        return response;
    }
}

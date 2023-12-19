using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace WorkItemEstimation.AzureFunction;

public class PutVote(ILoggerFactory loggerFactory, StorageClient storageClient)
{
    private readonly ILogger _logger = loggerFactory.CreateLogger<PutVote>();
    private readonly StorageClient _storageClient = storageClient;

    [Function("Vote")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "put", Route = "rooms/{roomId}/voters/{voterId}/vote")] HttpRequestData req,
        string roomId, string voterId)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        var voteRequest = await req.ReadRequestAsync<VoteRequest>(r =>
        {
            r.RoomId = roomId;
            r.VoterId = voterId;
        });

        if (voteRequest == null)
            return req.CreateResponse(HttpStatusCode.BadRequest);

        HttpResponseData response;
        var roomEntity = await _storageClient.Get<Room>(roomId, roomId);

        if (roomEntity == null)
        {
            response = req.CreateResponse(HttpStatusCode.NotFound);
            await response.WriteStringAsync("Room does not exist");
            return response;
        }

        if (!await _storageClient.Exists<Voter>(roomId, voterId))
        {
            response = req.CreateResponse(HttpStatusCode.NotFound);
            await response.WriteStringAsync("Voter does not exist");
            return response;
        }

        var room = Room.FromEntity(roomEntity);
        var allowedValues = room.AllowedValues;

        if (!allowedValues.Contains(voteRequest.Value))
        {
            response = req.CreateResponse(HttpStatusCode.BadRequest);
            await response.WriteStringAsync("Vote value not allowed");
            return response;
        }

        var vote = new Vote(roomId, voterId, voteRequest.Value);
        await _storageClient.AddOrUpdate<Vote>(vote.ToEntity());

        response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(vote);

        return response;
    }
}

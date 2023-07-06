using System;
using Domain.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;

namespace WebAPI.SignalR
{
	public class GameHub : Hub
	{
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();

        public override async Task OnConnectedAsync()
        {
            string userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;
            await Clients.Caller.SendAsync("ConnectionIdReceived", connectionId);

            _connections.Add(userName, connectionId);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;

            _connections.Remove(userName, connectionId);

            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinGame(string gameId)
        {
            string userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;

            await Groups.AddToGroupAsync(connectionId, gameId);

            // Notify all clients in the group that a player joined
            await Clients.Group(gameId).SendAsync("PlayerJoined", userName);
        }

        public async Task LeaveGame(string gameId)
        {
            string connectionId = Context.ConnectionId;

            await Groups.RemoveFromGroupAsync(connectionId, gameId);

            // Notify all clients in the group that a player left
            await Clients.Group(gameId).SendAsync("PlayerLeft", Context.User.Identity.Name);
        }

        public async Task PickCard(string gameId, string cardValue)
        {
            string userName = Context.User.Identity.Name;

            // Send the picked card value to all clients in the group
            await Clients.Group(gameId).SendAsync("CardPicked", userName, cardValue);
        }



    }
}


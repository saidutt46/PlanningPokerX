using System;
using Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.SignalR
{
	public class GameHub : Hub
	{
        public override async Task OnConnectedAsync()
        {
            // Send the connection ID and list of participants back to the client
            await Clients.Caller.SendAsync("ConnectionIdReceived", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            // let users know player has disconnected
            Clients.All.SendAsync("PlayerDisconnected", Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinGame(string gameId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("PlayerJoined", Context.ConnectionId);
        }

        public async Task LeaveGame(string gameId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("PlayerLeft", Context.ConnectionId);
        }

        public async Task CardPick(string gameId, string move)
        {
            await Clients.Group(gameId).SendAsync("MoveReceived", move);
        }

        public async Task GameStart(string gameId)
        {
            await Clients.Group(gameId).SendAsync("GameStarted");
        }

        public async Task GameEnd(string gameId)
        {
            await Clients.Group(gameId).SendAsync("GameEnded");
        }

        public async Task GameReset(string gameId)
        {
            await Clients.Group(gameId).SendAsync("GameReset");
        }

        public async Task GamePause(string gameId)
        {
            await Clients.Group(gameId).SendAsync("GamePaused");
        }

        public async Task GameResume(string gameId)
        {
            await Clients.Group(gameId).SendAsync("GameResumed");
        }

        public async Task GameOver(string gameId)
        {
            await Clients.Group(gameId).SendAsync("GameOver");
        }

        public async Task GameDraw(string gameId)
        {
            await Clients.Group(gameId).SendAsync("GameDraw");
        }

    }
}


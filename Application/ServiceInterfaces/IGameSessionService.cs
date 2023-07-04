using System;
using Application.Models;
using Application.ViewModels;
using Domain.Entities;

namespace Application.ServiceInterfaces
{
	public interface IGameSessionService
	{
        Task<BaseDtoListResponse<GameSession>> ListAsync();
        Task<BaseDtoResponse<GameSession>> GetById(Guid id);
        Task<BaseDtoResponse<GameSession>> Add(CreateGameModel request);
        Task<BaseDtoResponse<GameSession>> Delete(Guid id);
    }
}


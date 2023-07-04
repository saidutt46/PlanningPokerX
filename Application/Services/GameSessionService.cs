using System;
using Application.Models;
using Application.RepositoryInterfaces;
using Application.ServiceInterfaces;
using Application.ViewModels;
using Application.ViewResponses;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Application.Services
{
	public class GameSessionService : IGameSessionService
	{
        private readonly IGameSessionRepository _gameRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public GameSessionService(IMapper mapper, IGameSessionRepository gameSession, UserManager<ApplicationUser> userManager)
		{
			_gameRepository = gameSession;
            _userManager = userManager;
		}

        public async Task<BaseDtoListResponse<GameSession>> ListAsync()
        {
            try
            {
                IList<GameSession> games = await _gameRepository.ListAll();
                if (games != null)
                {
                    BaseDtoListResponse<GameSession> response = new(games);
                    return response;
                }
                else
                {
                    return new BaseDtoListResponse<GameSession>("No Active Game sessions found, try adding a new one!");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoListResponse<GameSession>(ex.Message);
            }
        }

        public async Task<BaseDtoResponse<GameSession>> GetById(Guid id)
        {
            GameSession game = await _gameRepository.GetById(id);

            if (game == null)
                return new BaseDtoResponse<GameSession>("Game session Not Found or No longer exists");
            return new BaseDtoResponse<GameSession>(game);
        }

        public async Task<BaseDtoResponse<GameSession>> Add(CreateGameModel request)
        {
            try
            {
                var userExists = await _userManager.FindByIdAsync(request.ApplicationUserId.ToString());
                if (userExists == null)
                    return new BaseDtoResponse<GameSession>("Unable to create a new game, User creating the game doesn't exist");
                GameSession model = new()
                {
                    GameName = request.GameName,
                    SessionCreatorId = request.ApplicationUserId
                };
        
                GameSession game = await _gameRepository.Add(model);
                if (game != null)
                {
                    return new BaseDtoResponse<GameSession>(game);
                }
                else
                {
                    return new BaseDtoResponse<GameSession>("Unable to create a new game, try again");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<GameSession>($"An error occurred when creating the game: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<GameSession>> Delete(Guid id)
        {
            try
            {
                GameSession game = await _gameRepository.GetById(id);
                if (game != null)
                {
                    await _gameRepository.Delete(game);
                    return new BaseDtoResponse<GameSession>(game);

                }
                else
                {
                    return new BaseDtoResponse<GameSession>("Unable to delete: Game Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<GameSession>($"An error occurred when deleting the game: {ex.Message}");
            }
        }
    }
}


using System;
using Application.RepositoryInterfaces;
using Domain.Entities;
using Persistence.Context;

namespace Persistence.Repository
{
	public class GameSessionRepository : EfRepository<GameSession>, IGameSessionRepository
	{
        public GameSessionRepository(ApplicationDbContext options) : base(options)
        {
        }
    }
}


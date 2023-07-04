using System;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels
{
	public class CreateGameModel
	{
        [Required(ErrorMessage = "User value is required")]
        public Guid ApplicationUserId { get; set; }
        public string ConnectionId { get; set; }
        public bool Spectator { get; set; }
        [Required(ErrorMessage = "Game Name is required")]
        public string GameName { get; set; }
    }

	public class JoinGameModel
	{
		public Guid ApplicationUserId { get; set; }
		public Guid GameId { get; set; }
		public string ConnectionId { get; set; }
		public bool Spectator { get; set; }
		public bool IsAdmin { get; set; }
	}

	public class LeaveGameModel
	{
        public Guid ApplicationUserId { get; set; }
        public string ConnectionId { get; set; }
    }
}


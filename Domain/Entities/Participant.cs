using System;
using Domain.Common;

namespace Domain.Entities
{
	public class Participant : BaseEntity
	{
		public bool Spectator { get; set; }
		public bool IsAdmin { get; set; } // If creates a session

		public virtual string? ApplicationUser { get; set; } // navigation property
		public virtual GameSession? GameSession { get; set; } // navigation player <-> session
	}
}


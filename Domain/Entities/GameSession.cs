using System;
using Domain.Common;

namespace Domain.Entities
{
	public class GameSession : BaseEntity
	{
		public string? GameName { get; set; }
		public virtual Guid SessionCreatorId { get; set; }
		public virtual List<Participant>? Participants { get; set; }
	}
}


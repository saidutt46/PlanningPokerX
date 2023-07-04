using System;
using Domain.Common;

namespace Domain.Entities
{
	public class GameSession : BaseEntity
	{
		public string GameName { get; set; }
		public Guid SessionCreatorId { get; set; }
	}
}


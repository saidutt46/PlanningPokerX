using System;
using Domain.Common;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Context
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<GameSession>().HasMany(p => p.Participants);
            builder.Entity<GameSession>().HasKey(s => s.Id);
            builder.Entity<Participant>().HasKey(s => s.Id);
        }

        public override int SaveChanges()
        {
            AddAuitInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddAuitInfo();
            return await base.SaveChangesAsync();
        }

        private void AddAuitInfo()
        {
            var entries = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    ((BaseEntity)entry.Entity).Created = DateTime.UtcNow;
                }
                ((BaseEntity)entry.Entity).Modified = DateTime.UtcNow;
            }
        }
    }
}


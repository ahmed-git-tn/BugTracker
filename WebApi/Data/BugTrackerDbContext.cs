using BugTracker.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace BugTracker.Data
{
    public class BugTrackerDbContext : IdentityDbContext<ApplicationUser>
    {

        public BugTrackerDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Bug> Bugs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            SeedApplicationUsers(modelBuilder);

            // Ignore Table
            modelBuilder.Ignore<IdentityUserLogin<string>>();
            modelBuilder.Ignore<IdentityUserClaim<string>>();
            modelBuilder.Ignore<IdentityUserRole<string>>();
            modelBuilder.Ignore<IdentityRole<string>>();
            modelBuilder.Ignore<IdentityRoleClaim<string>>();
            modelBuilder.Ignore<IdentityUserToken<string>>();

            // Ignore Column
            modelBuilder.Entity<ApplicationUser>().Ignore(c => c.AccessFailedCount)
                                        .Ignore(c => c.LockoutEnd)
                                        .Ignore(c => c.LockoutEnabled)
                                        .Ignore(c => c.TwoFactorEnabled);
        }

        private void SeedApplicationUsers(ModelBuilder modelBuilder)
        {
            ApplicationUser admin = new ApplicationUser()
            {
                Id = "b74ddd14-6340-4840-95c2-db12554843e5",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@admin.com",
                IsAdmin = true,
                SecurityStamp = new Guid().ToString("D")
            };

            PasswordHasher<ApplicationUser> passwordHasher = new PasswordHasher<ApplicationUser>();
            admin.PasswordHash = passwordHasher.HashPassword(admin, "admin");

            modelBuilder.Entity<ApplicationUser>().HasData(admin);
        }
    }
}

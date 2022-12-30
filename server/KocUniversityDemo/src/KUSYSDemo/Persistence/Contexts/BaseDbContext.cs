using Domain.Entites;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Contexts
{
    public class BaseDbContext : IdentityDbContext<User, Role, int>
    {
        public BaseDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>()
            .HasData(
                    new Role { Id = 1, Name = "Admin", NormalizedName = "ADMIN" },
                    new Role { Id = 2, Name = "User", NormalizedName = "USER" }
                );
        }
    }
}

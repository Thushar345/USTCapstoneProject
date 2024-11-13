using AllocateResourceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AllocateResourceAPI.Data
{
    public class AllocateResourceContext : DbContext
    {
        public AllocateResourceContext(DbContextOptions<AllocateResourceContext> options)
            : base(options) { }

        public DbSet<AllocateResource> AllocateResources { get; set; }
        public DbSet<AllocatedR> AllocatedRs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AllocateResource>()
                .HasMany(ar => ar.allocatedR) // One AllocateResource can have many AllocatedR
                .WithOne(ar => ar.AllocateResource) // Each AllocatedR has one AllocateResource
                .HasForeignKey(ar => ar.AllocationId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete if AllocateResource is deleted
        }

    }
}

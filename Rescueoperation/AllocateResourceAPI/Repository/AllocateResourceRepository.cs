using AllocateResourceAPI.Data;
using AllocateResourceAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AllocateResourceAPI.Repository
{
    public class AllocateResourceRepository : IAllocateResourceRepository
    {
        private readonly AllocateResourceContext _context;

        public AllocateResourceRepository(AllocateResourceContext context)
        {
            _context = context;
        }

        // Get all allocated resources (with allocated resources)
        public async Task<IEnumerable<AllocateResource>> GetResourceAllocateAsync()
        {
            return await _context.AllocateResources
                .Include(ar => ar.allocatedR) // Include the related allocated resources
                .ToListAsync();
        }

        // Get resource allocation by allocationId
        public async Task<AllocateResource> GetResourceAllocateByIdAsync(int allocationId)
        {
            return await _context.AllocateResources
                .Include(ar => ar.allocatedR) // Include the related allocated resources
                .FirstOrDefaultAsync(ar => ar.AllocationId == allocationId);
        }

        public async Task AddResourceAllocateAsync(AllocateResource allocateResource)
        {
            _context.AllocateResources.Add(allocateResource);
            await _context.SaveChangesAsync();
        }
    }
}

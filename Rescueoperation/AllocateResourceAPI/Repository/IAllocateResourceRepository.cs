using AllocateResourceAPI.Models;

namespace AllocateResourceAPI.Repository
{
    public interface IAllocateResourceRepository
    {
        // Get all resource allocations (with allocated resources)
        Task<IEnumerable<AllocateResource>> GetResourceAllocateAsync();

        // Get a specific resource allocation by allocationId (with allocated resources)
        Task<AllocateResource> GetResourceAllocateByIdAsync(int allocationId);

        // Add a new resource allocation (and its associated allocated resources)
        Task AddResourceAllocateAsync(AllocateResource allocateResource);
    }
}

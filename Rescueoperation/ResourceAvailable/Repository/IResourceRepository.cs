using System.Collections.Generic;
using System.Threading.Tasks;
using ResourceAvailable.Models;

namespace ResourceAvailable.Repositories
{
    public interface IResourceRepository
    {
        Task<IEnumerable<Resource>> GetResourcesAsync();
        Task<Resource> GetResourceAsync(int id);
        Task AddResourceAsync(Resource resource);
        Task UpdateResourceAsync(Resource resource);
        Task DeleteResourceAsync(int id);
        Task<bool> ResourceExistsAsync(int id);
    }
}

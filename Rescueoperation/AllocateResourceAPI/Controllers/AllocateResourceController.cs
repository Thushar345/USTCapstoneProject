using AllocateResourceAPI.Data.DTO;
using AllocateResourceAPI.Models;
using AllocateResourceAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AllocateResourceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateResourceController : ControllerBase
    {
        private readonly IAllocateResourceRepository _repository;
        public AllocateResourceController(IAllocateResourceRepository allocateResourceRepository) 
        {
            _repository = allocateResourceRepository;
        }

        // GET: api/AllocateResource/{allocationId}
        [HttpGet("{allocationId}")]
        public async Task<IActionResult> GetAllocatedResources(int allocationId)
        {
            var allocatedResources = await _repository.GetResourceAllocateByIdAsync(allocationId);

            if (allocatedResources == null)
            {
                return NotFound($"No allocated resources found for allocation ID {allocationId}");
            }

            return Ok(allocatedResources); // Include allocatedR list in response
        }

        // GET: api/AllocateResource
        [HttpGet]
        public async Task<IActionResult> GetAllAllocatedResources()
        {
            var allocatedResources = await _repository.GetResourceAllocateAsync();

            if (allocatedResources == null)
            {
                return NotFound("No allocated resources found.");
            }

            return Ok(allocatedResources); // Include allocatedR list in response
        }

        //[HttpPost]
        //public async Task<ActionResult<AllocateResource>> PostAllocateResource(AllocateResource allocateResource)
        //{
        //    await _repository.AddResourceAllocateAsync(allocateResource);
        //    return CreatedAtAction(nameof(GetAllocateResources), new { id = allocateResource.AllocationId }, allocateResource);
        //}


        [HttpPost]
        public async Task<IActionResult> AllocateResources([FromBody] AllocateResourceDto allocateResourceDto)
        {
            var allocateResource = new AllocateResource
            {
                IncidentId = allocateResourceDto.IncidentId,
                IncidentName = allocateResourceDto.IncidentName,
                IncidentType = allocateResourceDto.IncidentType,
                Location = allocateResourceDto.Location,
                Severity = allocateResourceDto.Severity,
                allocatedR = allocateResourceDto.AllocatedR.Select(r => new AllocatedR
                {
                    ResourceName = r.ResourceName,
                    ResourceType = r.ResourceType,
                    QuantityAllocated = r.QuantityAllocated
                }).ToList()
            };

            await _repository.AddResourceAllocateAsync(allocateResource);
            return Ok();
        }

    }
}

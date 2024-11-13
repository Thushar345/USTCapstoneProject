using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AllocateResourceAPI.Models
{
    public class AllocatedR
    {
        [Key]
        public int Id { get; set; }

        public string ResourceName { get; set; }
        public string ResourceType { get; set; }
        public int QuantityAllocated { get; set; }

        // Foreign key to AllocateResource
        public int AllocationId { get; set; }

        // The navigation property linking to AllocateResource
        [ForeignKey("AllocationId")]
        public AllocateResource AllocateResource { get; set; }
    }

}

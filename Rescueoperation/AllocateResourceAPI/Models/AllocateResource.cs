using System.ComponentModel.DataAnnotations;

namespace AllocateResourceAPI.Models
{
    public class AllocateResource
    {
        [Key]
        public int AllocationId { get; set; }
        public int IncidentId { get; set; }
        public string IncidentName { get; set; }
        public string IncidentType { get; set; }
        public string Location { get; set; }
        public string Severity { get; set; }
        public List<AllocatedR> allocatedR { get; set; } = new List<AllocatedR>();
    }

 
}

namespace AllocateResourceAPI.Data.DTO
{
    public class AllocateResourceDto
    {
        public int IncidentId { get; set; }
        public string IncidentName { get; set; }
        public string IncidentType { get; set; }
        public string Location { get; set; }
        public string Severity { get; set; }
        public List<AllocatedRDto> AllocatedR { get; set; }
    }

    public class AllocatedRDto
    {
        public string ResourceName { get; set; }
        public string ResourceType { get; set; }
        public int QuantityAllocated { get; set; }
    }

}

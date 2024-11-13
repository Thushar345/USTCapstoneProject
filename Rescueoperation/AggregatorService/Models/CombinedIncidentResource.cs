namespace AggregatorService.Models
{
    public class CombinedIncidentResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IncidentType { get; set; }
        public string Location { get; set; }
        public DateTime? IncidentDateTime { get; set; }
        public string Severity { get; set; }
        public string Description { get; set; }

        // Resource API fields
        public string ResourceName { get; set; }
        public int QuantityAllocated { get; set; }
    }

}

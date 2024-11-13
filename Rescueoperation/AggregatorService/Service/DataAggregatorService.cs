using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using AggregatorService.Models;
using VictimAPI.Models;
using AllocateResourceAPI.Models;

namespace AggregatorService.Services
{
    public class DataAggregatorService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public DataAggregatorService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<List<CombinedIncidentResource>> GetCombinedData()
        {
            // Fetch data from Victim API
            var victimResponse = await _httpClient.GetStringAsync(_configuration["VictimAPI:BaseUrl"] + "/Incidents");
            var incidents = JsonConvert.DeserializeObject<List<IncidentTbl>>(victimResponse);

            // Fetch data from Resource API
            var resourceResponse = await _httpClient.GetStringAsync(_configuration["AllocateApi:BaseUrl"] + "/ResourceAllocated");
            var resources = JsonConvert.DeserializeObject<List<ResourceAllocated>>(resourceResponse);

            // Combine data where IncidentTbl.Id equals Resource.ResourceId
            var combinedData = (from incident in incidents
                                join resource in resources
                                on incident.Id equals resource.IncidentId  // Matching IncidentTbl.Id and Resource.ResourceId
                                select new CombinedIncidentResource
                                {
                                    Id = incident.Id,
                                    Name = incident.Name,
                                    IncidentType = incident.IncidentType,
                                    Location = incident.Location,
                                    IncidentDateTime = incident.IncidentDateTime,
                                    Severity = incident.Severity,
                                    Description = incident.Description,
                                    ResourceName = resource.ResourceName,
                                    QuantityAllocated=resource.QuantityAllocated,
                                }).ToList();

            return combinedData;
        }

    }
}

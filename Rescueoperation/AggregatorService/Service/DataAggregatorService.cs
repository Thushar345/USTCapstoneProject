using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using AggregatorService.Models;
using VictimAPI.Models;
using ResourceAvailableAPI.Models;

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
            var resourceResponse = await _httpClient.GetStringAsync(_configuration["ResourceAPI:BaseUrl"] + "/Resources");
            var resources = JsonConvert.DeserializeObject<List<Resource>>(resourceResponse);

            // Combine data where IncidentTbl.Id equals Resource.ResourceId
            var combinedData = (from incident in incidents
                                join resource in resources
                                on incident.Id equals resource.ResourceId  // Matching IncidentTbl.Id and Resource.ResourceId
                                select new CombinedIncidentResource
                                {
                                    Id = incident.Id,
                                    Name = incident.Name,
                                    IncidentType = incident.IncidentType,
                                    Location = incident.Location,
                                    IncidentDateTime = incident.IncidentDateTime,
                                    Severity = incident.Severity,
                                    Description = incident.Description,
                                    ResourceType = resource.ResourceType,
                                    ResourceName = resource.ResourceName,
                                    NumberOfAvailable = resource.NumberOfAvailable
                                }).ToList();

            return combinedData;
        }

    }
}

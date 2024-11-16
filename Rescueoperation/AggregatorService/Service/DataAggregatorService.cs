using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using AggregatorService.Models;
using VictimAPI.Models;
using ResourceAvailableAPI.Models;
using System.Linq;
using AllocateResourceAPI.Models;
using System;

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

        // Method to fetch and combine data from the Victim API and Resource API
        public async Task<List<CombinedIncidentResource>> GetCombinedData()
        {
            try
            {
                // Fetch data from Victim API
                var victimResponse = await _httpClient.GetStringAsync(_configuration["VictimAPI:BaseUrl"] + "/Incidents");
                if (string.IsNullOrEmpty(victimResponse))
                {
                    Console.WriteLine("Failed to fetch incidents data from Victim API.");
                    return new List<CombinedIncidentResource>();
                }

                var incidents = JsonConvert.DeserializeObject<List<IncidentTbl>>(victimResponse);
                if (incidents == null || !incidents.Any())
                {
                    Console.WriteLine("No incidents found in Victim API.");
                    return new List<CombinedIncidentResource>();
                }

                // Fetch data from Resource API
                var resourceResponse = await _httpClient.GetStringAsync(_configuration["ResourceAPI:BaseUrl"] + "/ResourceAllocated");
                if (string.IsNullOrEmpty(resourceResponse))
                {
                    Console.WriteLine("Failed to fetch resources data from Resource API.");
                    return new List<CombinedIncidentResource>();
                }

                var resources = JsonConvert.DeserializeObject<List<ResourceAllocated>>(resourceResponse);
                if (resources == null || !resources.Any())
                {
                    Console.WriteLine("No resources found in Resource API.");
                    return new List<CombinedIncidentResource>();
                }

                // Combine data where IncidentTbl.Id equals Resource.IncidentId
                var combinedData = (from incident in incidents
                                    join resource in resources
                                    on incident.Id equals resource.IncidentId
                                    select new CombinedIncidentResource
                                    {
                                        incidentId = incident.Id,
                                        Name = incident.Name,
                                        IncidentType = incident.IncidentType,
                                        Location = incident.Location,
                                        IncidentDateTime = incident.IncidentDateTime,
                                        Severity = incident.Severity,
                                        allocationId = resource.AllocationId,
                                        ResourceName = resource.ResourceName,
                                        quantityAllocated = resource.QuantityAllocated
                                    }).ToList();

                return combinedData;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetCombinedData: {ex.Message}");
                return new List<CombinedIncidentResource>();
            }
        }

        // Method to update both Incident and Resource data
        public async Task<bool> UpdateIncidentResourceAsync(CombinedIncidentResource updatedData)
        {
            try
            {
                // Fetch existing incident data to ensure the incidentId is valid
                var existingIncidentResponse = await _httpClient.GetStringAsync(
                    _configuration["VictimAPI:BaseUrl"] + $"/Incidents/{updatedData.incidentId}"
                );

                if (string.IsNullOrEmpty(existingIncidentResponse))
                {
                    Console.WriteLine($"Incident with ID {updatedData.incidentId} not found in Victim API.");
                    return false;
                }

                var existingIncident = JsonConvert.DeserializeObject<IncidentTbl>(existingIncidentResponse);
                if (existingIncident == null)
                {
                    Console.WriteLine($"No existing incident data found for ID {updatedData.incidentId}");
                    return false;
                }

                // Prepare the updated incident data
                var incidentUpdate = new IncidentTbl
                {
                    Id = existingIncident.Id,
                    Name = updatedData.Name,
                    IncidentType = updatedData.IncidentType,
                    Location = updatedData.Location,
                    IncidentDateTime = updatedData.IncidentDateTime,
                    Severity = updatedData.Severity
                };

                // Make the PUT request to update the Incident data
                var incidentResponse = await _httpClient.PutAsJsonAsync(
                    _configuration["VictimAPI:BaseUrl"] + $"/Incidents/{incidentUpdate.Id}",
                    incidentUpdate
                );

                if (!incidentResponse.IsSuccessStatusCode)
                {
                    var errorResponse = await incidentResponse.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error updating Incident: {errorResponse}");
                    return false;
                }

                // Prepare the updated resource data
                var resourceUpdate = new ResourceAllocated
                {
                    AllocationId = updatedData.allocationId,
                    ResourceName = updatedData.ResourceName,
                    QuantityAllocated = updatedData.quantityAllocated
                };

                // Make the PUT request to update the Resource data
                var resourceResponse = await _httpClient.PutAsJsonAsync(
                    _configuration["ResourceAPI:BaseUrl"] + $"/Resources/{resourceUpdate.AllocationId}",
                    resourceUpdate
                );

                if (!resourceResponse.IsSuccessStatusCode)
                {
                    var errorResponse = await resourceResponse.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error updating Resource: {errorResponse}");
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateIncidentResourceAsync: {ex.Message}");
                return false;
            }
        }
    }
}

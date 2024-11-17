import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MapService } from '../../../service/map.service';

@Component({
  selector: 'app-add-incident',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent {
  incidentObj: any = {
    "id": 0,
    "name": "",
    "incidentType": "",
    "location": "",
    "incidentDateTime": "",
    "severity": "",
    "description": ""
  };
  
  http = inject(HttpClient);
  router = inject(Router);  // Inject Router to navigate to submission success page

  onSubmit() {

    if (!this.incidentObj.name || !this.incidentObj.incidentType || !this.incidentObj.location || 
      !this.incidentObj.incidentDateTime || !this.incidentObj.severity || !this.incidentObj.description) {
    alert("Please fill in all the required fields.");
    return; // Prevent form submission if any field is missing
    }


    this.http.post("https://localhost:7129/api/Incidents", this.incidentObj).subscribe((res: any) => {
      if (res.id > 0) {
        alert("Report Submitted Successfully");
        // After successful form submission, navigate to the submission-success page
        this.router.navigate(['/submission-success']);
      } else {
        alert("There was an issue creating the incident record");
      }
    });
  }


  coords: string = ''; // Stores the coordinates as "latitude, longitude"
  address: string = ''; // Stores the address
  error: string = ''; // Stores error messages

  constructor(private mapService: MapService) {}

  // Method to get the current location
  fetchCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Use the MapService to fetch the address
          this.mapService.getAddressFromCoords(latitude, longitude).subscribe(
            (response: any) => {
              const fetchedAddress = response.display_name; // Address from API
              this.incidentObj.location = fetchedAddress; // Populate the address into the form's location field
              this.error = ''; // Clear any existing errors
            },
            (error) => {
              this.error = 'Unable to fetch the location address. Please try again.';
            }
          );
        },
        (error) => {
          this.error = 'Unable to retrieve your current location. Please check your browser permissions.';
        }
      );
    } else {
      this.error = 'Geolocation is not supported by your browser.';
    }
  }





  
  
}

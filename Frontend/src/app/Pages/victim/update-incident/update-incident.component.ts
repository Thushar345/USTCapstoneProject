import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-incident',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-incident.component.html',
  styleUrl: './update-incident.component.css'
})
export class UpdateIncidentComponent implements OnInit {
 
  incidentObj: any = {
    "id": 0,
    "name": "",
    "incidentType": "",
    "location": "",
    "incidentDateTime": "",
    "severity": "",
    "description": ""
  };

  incidentuList: any[] = []; 
  http = inject(HttpClient); 

  ngOnInit(): void {
    this.loadIncidents();
  }

  // Method to load incidents
  loadIncidents() {
    this.http.get('https://localhost:7129/api/Incidents').subscribe((res: any) => {
      this.incidentuList = res;
    });
  }

  // Method to select an incident for editing
  onEdit(data: any) {
    debugger;
    this.incidentObj = data; // Assign selected data to incidentObj
  }

  // Method to update an incident
  onUpdate() {
    this.http.put("https://localhost:7129/api/Incidents/" + this.incidentObj.id, this.incidentObj)
      .subscribe((res: any) => {
        // Check if the response contains a valid incident object with a valid id
        if (res && res.id !== 0) {  // Assuming id should not be 0 after update
          alert("Incident Record Updated!");
          this.loadIncidents();  // Optionally reload incidents to reflect changes
        } else {
          alert("Some Problem in Incident Updation");
        }
      }, (error) => {
        console.error('Error occurred:', error);
        alert("Error while updating the incident.");
      });
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }

}

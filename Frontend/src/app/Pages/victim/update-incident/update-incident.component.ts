import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-incident',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.css'] // Fixed typo
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

  incidentList: any[] = [];
  http = inject(HttpClient);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents() {
    this.http.get('http://localhost:7777/api/Incidents').subscribe((res: any) => {
      this.incidentList = res;
    });
  }

  onEdit(data: any) {
    this.incidentObj = { ...data }; // Shallow copy to avoid reference issues
    console.log("Editing Incident:", this.incidentObj); // Verify that `id` and other fields are set correctly
  }

  onUpdate() {
    console.log(this.incidentObj);
    this.http.put(`http://localhost:7777/api/Incidents/${this.incidentObj.id}`, this.incidentObj)
      .subscribe(
        (res: any) => {
          if (res && res.id) {
            alert("Incident Record Updated!");
            this.router.navigate(['app-login']); // Replace with your target route
          } else {
            alert("Some Problem in Incident Updation");
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          alert("Error while updating the incident.");
        }
      );
  }
}

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

  loadIncidents() {
    this.http.get('https://localhost:7129/api/Incidents').subscribe((res: any) => {
      this.incidentuList = res;
    });
  }

  onEdit(data: any) {
    debugger;
    this.incidentObj = data;
  }

  onUpdate() {
    this.http.put("https://localhost:7129/api/Incidents/" + this.incidentObj.id, this.incidentObj)
      .subscribe((res: any) => {
        if (res && res.id !== 0) {  
          alert("Incident Record Updated!");
          this.loadIncidents();  
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

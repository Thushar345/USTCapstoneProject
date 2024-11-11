import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-incident',
  standalone: true,
  imports: [FormsModule],
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

  onSubmit() {
    debugger;
    this.http.post("https://localhost:7129/api/Incidents", this.incidentObj).subscribe((res: any) => {
      debugger;
      if (res.id >= 0) 
        alert("Incident Record Created!");
      else {
        alert("There was an issue creating the incident record");
      }
    });
  }
}


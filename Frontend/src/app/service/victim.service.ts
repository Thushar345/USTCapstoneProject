import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-victim-service',
  standalone: true,
  imports: [],
  templateUrl: './victim-service.component.html',
  styleUrls: ['./victim-service.component.css']
})
export class VictimServiceComponent {
   constructor(private http: HttpClient) { }

   GetIncidents() {
     return this.http.get("https://localhost:7129/api/Incidents");
   }
} 
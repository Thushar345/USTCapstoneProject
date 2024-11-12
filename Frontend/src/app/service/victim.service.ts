import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({

  providedIn: 'root'
 
 })


export class VictimServiceComponent {
   constructor(private http: HttpClient) { }

   GetIncidents() {
     return this.http.get("https://localhost:7129/api/Incidents");
   }
} 
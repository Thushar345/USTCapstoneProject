import {HttpClient} from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({

 providedIn: 'root'

})

export class VictimService {

 constructor(private http: HttpClient) { }

 GetIncident() {

  return this.http.get("http://localhost:5000/Incidents")

 }
}


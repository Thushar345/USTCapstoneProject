import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Allocation {
  incidentId: number;
  name: string;
  incidentType: string;
  location: string;
  incidentDateTime: string;
  severity: string;
  allocationId: number;
  resourceName: string;
  quantityAllocated: number;
}

@Injectable({
 providedIn: 'root'
})



export class AllocateService {
 constructor(private http: HttpClient) { }

 

 GetAllocate(): Observable<Allocation[]> {
  return this.http.get<Allocation[]>("https://localhost:5000/combineddata");
}


 UpdateAllocate(allocationid: number, data: any) {
    return this.http.put(`https://localhost:5000/ResourceAllocated/${allocationid}`, data);
  }  
}

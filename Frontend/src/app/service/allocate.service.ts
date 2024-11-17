import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class AllocateService {
 constructor(private http: HttpClient) { }

 GetAllocate() {
  return this.http.get("http://localhost:5000/combineddata");
 }

 UpdateAllocate(allocationid: number, data: any) {
  return this.http.put(`http://localhost:5000/resourceallocated/${allocationid}`, data);
}

}

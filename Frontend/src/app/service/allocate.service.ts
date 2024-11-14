import {HttpClient} from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({

 providedIn: 'root'

})

export class AllocateService {

 constructor(private http: HttpClient) { }

 GetAllocate() {

  return this.http.get("https://localhost:7240/api/ResourceAllocated")

 }
}


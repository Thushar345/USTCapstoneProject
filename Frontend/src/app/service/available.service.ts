import {HttpClient} from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({

 providedIn: 'root'

})

export class ResourceService {

 constructor(private http: HttpClient) { }

 GetResource() {

  return this.http.get("https://localhost:5000/Resources")

 }

}


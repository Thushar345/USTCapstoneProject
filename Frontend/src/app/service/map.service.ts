import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiUrl = 'https://geocode.maps.co/reverse';

  constructor(private http: HttpClient) {}

  getAddressFromCoords(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${latitude}&lon=${longitude}&api_key=6736036073896262725160lti125486`;
    return this.http.get(url);
  }
}

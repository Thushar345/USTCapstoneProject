import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:7133/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const loginPayload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginPayload);
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  assignRole(email: string, role: string) {
    return this.http.post(`${this.apiUrl}/AssignRole`, { email, role });
  }
}

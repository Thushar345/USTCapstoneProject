import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This will allow it to be injectable globally
})
export class AuthService {

  private apiUrl: string = 'https://localhost:7133/api/AuthAPI/login'; // The URL for your login API

  constructor() { }

  // Login function to authenticate the user with the backend
  async login(username: string, password: string): Promise<any> {
    const loginData = { Username: username, Password: password };
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data.result || { token: null };
    } catch (error) {
      throw new Error('Error during login: ' + error.message);
    }
  }
}

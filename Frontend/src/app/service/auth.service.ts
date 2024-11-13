import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {

  private apiUrl: string = 'https://localhost:7133/api/AuthAPI/login';

  constructor() { }

  
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
    } catch (error:any) {
      throw new Error('Error during login: ' + error.message);
    }
  }
}

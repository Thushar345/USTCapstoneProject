import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  login() {
    console.log("Login button clicked!");
  
    const loginPayload = { username: this.username, password: this.password };
  
    this.http.post('https://localhost:7133/api/AuthAPI/login', loginPayload).subscribe(
      (response: any) => {
        console.log("API Response:", response);  // Log the full response
  
        // Check if response.result and response.result.token exist
        if (response.isSuccess && response.result && response.result.token) {
          localStorage.setItem('token', response.result.token);  // Store the token correctly
          this.router.navigate(['']);
        } else {
          this.errorMessage = 'Login failed. Token is missing or invalid.';
          console.error('Login failed: Token is missing or invalid');
        }
      },
      (error) => {
        console.error('API Error:', error);  // Log the full error for debugging
        this.errorMessage = 'Invalid credentials or server error.';
      }
    );
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RegisterResponse {
  issuccess: boolean;
  message?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  name: string = '';
  phoneNumber: string = '';
  password: string = '';
  role: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Register function to handle form submission
  register() {
    const registrationPayload = {
      email: this.email,
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: this.password,
      role: this.role
    };

    // Call the API endpoint
    this.http.post<RegisterResponse>('https://localhost:7133/api/AuthAPI/register', registrationPayload).subscribe(
      (response) => {
        // Handle successful registration response
        if (response?.issuccess) {

          console.log('Registration successful');
          // Optional: Reset form fields
          this.email = '';
          this.name = '';
          this.phoneNumber = '';
          this.password = '';
          this.role = '';

          // Redirect to login or home page after successful registration
          this.router.navigate(['app-login']); // Update '/login' as per your route

        } else {
          // Handle failure case (invalid response or failure message)
          console.error('Registration success:', response?.message || 'with Unexpected response format');
          alert(`Registration success: ${response?.message || 'sucesss'}`);
          this.router.navigate(['app-login']);
        }
      },
      (error) => {
        // Handle HTTP request errors
        console.error('An error occurred during registration:', error.message || error);
        alert(`An error occurred: ${error.message || 'Unknown error'}`);
      }
    );
  }
}

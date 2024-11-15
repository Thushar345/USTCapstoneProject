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

  register() {
    const registrationPayload = {
      email: this.email,
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: this.password,
      role: this.role
    };
  
    this.http.post<any>('https://localhost:7133/api/AuthAPI/register', registrationPayload).subscribe(
      (response) => {
        if (response?.issuccess) {
          console.error('register success');
          this.router.navigate(['']);
        } else {
          console.error('Registration failed:', response?.message || 'Unexpected response format');
        }
      },
      (error) => {
        console.error('An error occurred during registration:', error.message || error);
      }
    );
  }
}  

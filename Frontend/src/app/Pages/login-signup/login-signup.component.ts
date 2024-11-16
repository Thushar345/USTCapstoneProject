import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface RegisterResponse {
  issuccess: boolean;
  message?: string;
}

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})


export class LoginSignupComponent implements OnInit  {

  ngOnInit() {
    const container = document.querySelector('.container') as HTMLElement;
    const registerBtn = document.querySelector('.register-btn') as HTMLElement;
    const loginBtn = document.querySelector('.login-btn') as HTMLElement;

    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
  }


  constructor(private http: HttpClient, private router: Router) {}


  
//Registratin code starts from here
  email: string = '';
  name: string = '';
  phoneNumber: string = '';
  password: string = '';
  role: string = '';


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
          this.router.navigate(['login-signup']); // Update '/login' as per your route

        } else {
          // Handle failure case (invalid response or failure message)
          console.error('Registration success:', response?.message || 'with Unexpected response format');
          alert(`Registration success: ${response?.message || 'sucesss'}`);
          this.router.navigate(['login-signup']);
        }
      },
      (error) => {
        // Handle HTTP request errors
        console.error('An error occurred during registration:', error.message || error);
        alert(`An error occurred: ${error.message || 'Unknown error'}`);
      }
    );
  }





  //login code starts from here
  username: string = '';
  passwordl: string = '';
  errorMessage: string = '';


  login() {
    console.log('Login button clicked!');

    const loginPayload = { username: this.username, password: this.passwordl };

    this.http.post('https://localhost:7133/api/AuthAPI/login', loginPayload).subscribe(
      (response: any) => {
        console.log('API Response:', response); // Log the full response

        if (response.isSuccess && response.result && response.result.token) {
          localStorage.setItem('token', response.result.token); // Store the token correctly

          // Check email domain to navigate accordingly
          if (this.username.includes('@user.com') || this.username.includes('@gmail.com')) {
            this.router.navigate(['app-add-incident']);
          } else if (this.username.includes('@admin.com')) {
            // Navigate to admin page
            this.router.navigate(['app-incident-display']);
          } else {
            // Fallback in case the domain doesn't match any known pattern
            this.router.navigate(['app-update']);
          }
        } else {
          this.errorMessage = 'Login failed. Token is missing or invalid.';
          console.error('Login failed: Token is missing or invalid');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('API Error:', error); // Log the full error for debugging
        this.errorMessage = 'Invalid credentials or server error.';
      }
    );
  }


}

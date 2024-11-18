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
    this.http.post<RegisterResponse>('https://localhost:5000/auth/register', registrationPayload).subscribe(
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
          //this.router.navigate(['/login-signup']); // Update '/login' as per your route
          alert(`Registration Success`);
          window.location.href = '/login-signup';

        } else {
          // Handle failure case (invalid response or failure message)
          console.error('Registration success:', response?.message || 'with Unexpected response format');
          //this.router.navigate(['/login-signup']);
          window.location.href = '/login-signup';
          alert(`Registration success: ${response?.message || 'sucesss'}`);
        }
      },
      (error) => {
        // Handle HTTP request errors
        console.error('An error occurred during registration:', error.message || error);
        alert(`An error occurred: ${error.message || 'Unknown error'}`);
      }
    );
  }

  newdata:any={
    username: "",
    password: ""
  }



  //login code starts from here


  login() {
    console.log('Login button clicked!');
  
    this.http.post("https://localhost:5000/auth/login", this.newdata).subscribe(
      (response: any) => {
        console.log('API Response:', response);
  
        if (response.isSuccess && response.result && response.result.token) {
          localStorage.setItem('token', response.result.token);
  
          if (this.newdata.username.includes('@user.com') || this.newdata.username.includes('@gmail.com')) {
            this.router.navigate(['app-add-incident']);
          } else if (this.newdata.username.includes('@admin.com')) {
            this.router.navigate(['app-incident-display']);
          } else {
            this.router.navigate(['app-update']);
          }
        } else {
          console.error('Login failed: Token is missing or invalid');
          alert('Login failed: Incorrect username or password.');
        }
      },
      (error) => {
        console.error('API Error:', error);
  
        if (error.status === 400) {
          // Specific handling for 400 Bad Request
          alert('Incorrect username or password. Please check your credentials and try again.');
        } else {
          // Generic handling for other errors
          alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
        }
      }
    );
  }
  

}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    console.log('Login button clicked!');

    const loginPayload = { username: this.username, password: this.password };

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
        console.error('API Error:', error); 
        this.errorMessage = 'Invalid credentials or server error.';
      }
    );
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Importing FormsModule for two-way binding
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userObj: any = {
    Username: '',
    Password: ''
  };

  router = inject(Router);  // Inject the router
  authService = inject(AuthService);  // Inject the AuthService for API calls

  onLogin() {
    // Call the AuthService login function that communicates with your API
    this.authService.login(this.userObj.Username, this.userObj.Password)
      .then(response => {
        if (response.token) {
          alert('Login Success');
          localStorage.setItem('loginUser', this.userObj.Username);
          localStorage.setItem('jwtToken', response.token);  // Store the token for subsequent requests
          this.router.navigateByUrl('add-emp'); // Navigate to the "add-emp" route after successful login
        } else {
          alert('Wrong Credentials');
        }
      })
      .catch(error => {
        alert('Error during login: ' + error.message);
      });
  }
}

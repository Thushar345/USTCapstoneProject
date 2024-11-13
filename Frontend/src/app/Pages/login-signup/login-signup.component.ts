import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [RouterLink],
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
}

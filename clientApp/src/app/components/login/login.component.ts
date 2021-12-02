import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthenticationServices } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  alert: boolean;
  errorMessage: string;
  isLoading: boolean = false;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authServices: AuthenticationServices,
    private route: Router
  ) {}

  onSubmit() {
    const username = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['password'].value;
    this.isLoading = true;
    this.authServices.CheckCredentials(username, password).subscribe(
      (token) => {
        this.isLoading = false;
        console.warn(token);
        localStorage.setItem('token', token);
        console.warn(localStorage.getItem('token'));
        let decodedToken = jwt_decode(token);
        console.warn(decodedToken);
        let isAdmin = decodedToken['IsAdmin'];
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('admin', isAdmin);
        this.route.navigate(['/backlog']);
      },
      (response) => {
        this.isLoading = false;
        console.warn(response.error);
        this.errorMessage = response.error;
        this.alert = true;
      
      }
    );
  }
}

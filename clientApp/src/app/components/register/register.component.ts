import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/models/registerDto.model';
import { AuthenticationServices } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  message: string = '';
  alert: boolean = false;
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthenticationServices) {}

  onSubmit() {
    let registerDto: RegisterDto;
    registerDto = this.registerForm.value;
    this.auth.register(registerDto).subscribe(
      (res) => {
        this.alert = true;
        this.message = res;
      },
      (response) => console.warn(response.error)
    );
  }
}

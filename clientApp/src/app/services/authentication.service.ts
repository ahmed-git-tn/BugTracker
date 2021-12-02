import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/registerDto.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationServices {
  private url: string = environment.api;

  constructor(private http: HttpClient) {}

  CheckCredentials(username: string, password: string) {
    return this.http.post(
      this.url + '/account/login',
      { username, password },
      { responseType: 'text' }
    );
  }

  register(registerDto: RegisterDto) {
    return this.http.post(this.url + '/account/register', registerDto,{responseType:'text'});
  }
}

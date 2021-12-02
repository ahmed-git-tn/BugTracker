import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url: string = environment.api;

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.url + '/users');
  }

  getUserById(id: number) {
    return this.http.get<User>(this.url + `/users/${id}`);
  }

  updateUserById(id: number, isAdmin: boolean) {
    return this.http.put<User>(this.url + `/users/${id}`, { isAdmin });
  }

  deleteUserById(id: number) {
    return this.http.delete(this.url + `/users/${id}`);
  }
}

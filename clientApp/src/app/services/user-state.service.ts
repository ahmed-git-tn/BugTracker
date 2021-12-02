import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStateService {

  loggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  isAdmin() {
    return localStorage.getItem('admin') === 'True';
  }
}

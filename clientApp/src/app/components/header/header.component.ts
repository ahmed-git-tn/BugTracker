import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    console.warn(localStorage);
    this.router.navigate(['']);
  }

  loggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  isAdmin() {
    return localStorage.getItem('admin') === 'True';
  }
}

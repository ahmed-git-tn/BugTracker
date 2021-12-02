import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthenticationServices } from 'src/app/services/authentication.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  p = 1;
  isAdmin:boolean;
  users: User[];

  constructor(
    private userService: UserService, private userStateServices:UserStateService
  ) {
   
    this.isAdmin = this.userStateServices.isAdmin();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  onDelete(id: number, name: string) {
    if (confirm('Are you sure to delete ' + name)) {
      this.userService.deleteUserById(id).subscribe((res) => this.loadUsers());
    }
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (response) => console.warn(response.error)
    );
  }

 
}

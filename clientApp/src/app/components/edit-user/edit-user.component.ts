import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit{

  userId: number;
  selectedValue: boolean;
  
  userForm = new FormGroup({
    permission: new FormControl(''),
  });
  currentPermission:boolean = this.userForm.controls.permission.value;
  
  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId)
    .subscribe(user => this.userForm.controls['permission'].setValue(user.isAdmin) 
     )
     
  }

  onEdit() {
    console.warn(this.userForm.value.permission);
    // convert value selected to boolean
    let selectedValue = (this.userForm.value.permission === 'true');
    this.userService.updateUserById(this.userId, selectedValue).subscribe(
      (res) => this.router.navigate(['/users']),
      (response) => console.warn(response.error)
    );
  }
}

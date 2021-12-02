import { Component, OnInit } from '@angular/core';
import { Bug } from 'src/app/models/bug.model';
import { AuthenticationServices } from 'src/app/services/authentication.service';
import { BacklogServices } from 'src/app/services/backlog.service';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent implements OnInit {

  p = 1;
  bugs: Bug[];
  isLoggedIn:boolean;

  constructor(private backlogServices: BacklogServices, private userStateService:UserStateService) {
    this.isLoggedIn = this.userStateService.loggedIn();
  }

  ngOnInit():void {
    this.loadAllBugs();
  }

  onDeleteBug(id: number, title: string) {
    if (confirm('Are you sure to delete ' + title + ' ?')) {
      this.backlogServices.deleteBugById(id).subscribe(
        () => this.loadAllBugs(),
        (response) => console.warn(response.error)
      );
    }
  }

  loadAllBugs() {
    this.backlogServices.getAllBugs()
    .subscribe((res) => (this.bugs = res),
    (response) => console.warn(response.error));
  }


}

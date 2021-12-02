import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BacklogServices} from 'src/app/services/backlog.service';

@Component({
  selector: 'app-add-new-bug',
  templateUrl: './add-new-bug.component.html',
  styleUrls: ['./add-new-bug.component.css'],
})
export class AddNewBugComponent {
  errorMessage: string;
  alert:boolean = false;
  bugId: number;
  newBugForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    priority: new FormControl('', Validators.required),
  });

  constructor(private route: Router, private backlogServices: BacklogServices) {}

  onSubmit() {
    const bug = this.newBugForm.value;
    this.backlogServices.addNewBug(bug).subscribe(
      () => this.route.navigate(['/backlog']),
      (response) => 
      {
        console.error(response.error);
        this.alert = true;
        this.errorMessage = response.error;
      }
    );
  }
}

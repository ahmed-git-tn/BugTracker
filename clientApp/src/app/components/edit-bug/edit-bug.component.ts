import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bug } from 'src/app/models/bug.model';
import { BacklogServices } from 'src/app/services/backlog.service';

@Component({
  selector: 'app-edit-bug',
  templateUrl: './edit-bug.component.html',
  styleUrls: ['./edit-bug.component.css'],
})
export class EditBugComponent implements OnInit {
  bugId: number;
  existingBug: Bug;

  bugForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl(''),
    state: new FormControl(''),
  });


  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private backlogServices: BacklogServices
  ) 
  {this.bugId = this.activeRoute.snapshot.params['id']; }

  ngOnInit(): void {
    this.backlogServices.getBugById(this.bugId).subscribe((bug) => {
      (this.existingBug = bug),
        this.bugForm.controls['title'].setValue(bug.title),
        this.bugForm.controls['description'].setValue(bug.description),
        this.bugForm.controls['priority'].setValue(bug.priority),
        this.bugForm.controls['state'].setValue(bug.state);
    });
  }

  onSubmit() {
    this.existingBug = this.bugForm.value;
    this.backlogServices
      .updateBugById(this.bugId, this.existingBug)
      .subscribe(() => this.route.navigate(['/backlog']));
  }
}

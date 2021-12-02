import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bug } from '../../models/bug.model';
import { BacklogServices } from '../../services/backlog.service';

@Component({
  selector: 'app-details-bug',
  templateUrl: './details-bug.component.html',
  styleUrls: ['./details-bug.component.css'],
})
export class DetailsBugComponent implements OnInit {
  bugId: number;
  bug: Bug;

  constructor(
    private activeRoute: ActivatedRoute,
    private backlogServices: BacklogServices
  ) {
    if (this.activeRoute.snapshot.params['id']) {
      this.bugId = this.activeRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.backlogServices
      .getBugById(this.bugId)
      .subscribe((bug) => (this.bug = bug));
  }
}

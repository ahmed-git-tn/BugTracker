import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bug } from '../models/bug.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BacklogServices {
  private url: string = environment.api;

  constructor(private http: HttpClient) {}

  getAllBugs() {
    return this.http.get<Bug[]>(this.url + '/bugs');
  }

  getBugById(id: number) {
    return this.http.get<Bug>(this.url + `/bugs/${id}`);
  }

  updateBugById(id: number, bug: Bug) {
    return this.http.put<Bug>(this.url + `/bugs/${id}`, bug);
  }

  deleteBugById(id: number) {
    return this.http.delete(this.url + `/bugs/${id}`);
  }

  addNewBug(bug: Bug) {
    return this.http.post(this.url + '/bugs', bug);
  }
}

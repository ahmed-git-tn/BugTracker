import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewBugComponent } from './components/add-new-bug/add-new-bug.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { DetailsBugComponent } from './components/details-bug/details-bug.component';
import { EditBugComponent } from './components/edit-bug/edit-bug.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {path:'backlog',component:BacklogComponent},
  {path:'new-bug',component:AddNewBugComponent},
  {path:'backlog/edit/:id',component:EditBugComponent},
  {path:'login', component:LoginComponent},
  {path:'backlog/details/:id', component:DetailsBugComponent},
  {path:'users', component:UsersListComponent},
  {path:'register', component:RegisterComponent},
  {path:'users/edit-user/:id',component:EditUserComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { AddNewBugComponent } from './components/add-new-bug/add-new-bug.component';
import { EditBugComponent } from './components/edit-bug/edit-bug.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DetailsBugComponent } from './components/details-bug/details-bug.component';
import { RegisterComponent } from './components/register/register.component';
import { RolePipe } from './pipes/role.pipe';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { LoadingSpinnerComponent } from './helpers/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BacklogComponent,
    AddNewBugComponent,
    EditBugComponent,
    LoginComponent,
    UsersListComponent,
    DetailsBugComponent,
    RegisterComponent,
    RolePipe,
    EditUserComponent,
    LoadingSpinnerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

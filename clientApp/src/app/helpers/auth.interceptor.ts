import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    private apiUrl = environment.api;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loginUrl = this.apiUrl+"api/login";
        if (request.url !== loginUrl) {
                //const token = localStorage.getItem('token');

                request = request.clone({
                // setHeaders: {
                // Authorization: `Bearer ${localStorage.getItem('token')}`
                // }
                headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
                });
         }
                return next.handle(request);
    }
    
}
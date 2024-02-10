import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { StorageService } from '../services/storage.service';
import { CustomToken } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


const MAX_REFRESH_ATTEMPTS = 5; 


@Injectable()
export class AuthInterceptInterceptor implements HttpInterceptor {

  private refreshAttempts = 0;


  constructor( private storage:StorageService,private http:HttpClient, private router:Router, private service:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let authReq = request;
    const token = this.storage.getAccessToken();
    if(token!=null){
      authReq = authReq.clone({
        setHeaders: {'Authorization':`Bearer ${token}`},
      })
    }
   

    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (this.refreshAttempts < MAX_REFRESH_ATTEMPTS) {
            console.log('Token expired. Refreshing...');
            this.refreshAttempts++;
            const refreshToken:string|null = this.storage.getRefreshToken()
            return this.service.refreshToken().pipe(
              switchMap((response) => {
                console.log("resp" + response);
                console.log("respAcces" + response.accessToken);
                this.storage.saveAccessToken(response.accessToken);
                this.storage.saveRefreshToken(response.refreshToken);

                const newRequest = request.clone({
                  setHeaders: { 'Authorization': `Bearer ${response.accessToken}` }
                });

                this.refreshAttempts = 0;
                return next.handle(newRequest);
              })
            );
          } else {
            console.log('Max refresh attempts reached. Redirecting to login...');
            this.router.navigate(['/login']);
            return throwError('Max refresh attempts reached');
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  
}

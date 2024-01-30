import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomToken, User, UserCred } from '../model/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  public login(userCred:UserCred):Observable<CustomToken>{
    
    return this.http.post<CustomToken>(`${this.baseURL}/api/v1/auth/login`,userCred);
  }

  public getCurrentUser():Observable<User>{
    return this.http.get<User>(`${this.baseURL}/current-user`);
  }

  public testMethod():Observable<string>{
    return this.http.get(`${this.baseURL}/api/user/test`,{responseType:'text'});
  }

  

  public registerUser(user:User):Observable<string>{
    return this.http.post<string>(`${this.baseURL}/api/v1/auth/register`,user)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        if (error instanceof HttpErrorResponse && error.status === 400 && error.error === 'Email already exists')

        {
          return throwError('Email alread in use');
        }else{
          return throwError('An error occurred. Please try again.');
        }
      })
    )
    ;

  }

  public logout(){
    return this.http.get(`${this.baseURL}/logout`);
  }
}

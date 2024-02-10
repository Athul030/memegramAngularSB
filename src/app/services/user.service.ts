import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomToken, JwtAuthResponse, User, UserCred } from '../model/user';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL:string = "http://localhost:8080";

  constructor(private http:HttpClient, private storage:StorageService) { }

  public login(userCred:UserCred):Observable<CustomToken>{
    
    return this.http.post<CustomToken>(`${this.baseURL}/api/v1/auth/login`,userCred);
  }

  // public refreshToken():Observable<JwtAuthResponse>{
  //   const refreshToken:string|null = this.storage.getRefreshToken();
  //   if (refreshToken !== null) {
  //   const formData = new FormData();
  //   formData.append('refreshToken', refreshToken);
  //   console.log("enter+" + formData.get('refreshToken'));
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.post<JwtAuthResponse>(`${this.baseURL}/api/v1/auth/refreshToken`,formData,{headers});
  //   } else {
  //     return throwError('Refresh token not available');
  //   }
  // }

  public refreshToken():Observable<JwtAuthResponse>{
    const refreshToken:string|null = this.storage.getRefreshToken();
    return this.http.post<JwtAuthResponse>(`${this.baseURL}/api/v1/auth/refreshToken`,refreshToken);
  
  }

  public checkAuthentication(): Observable<CustomToken> {
    return this.http.get<CustomToken>(`${this.baseURL}/callback`);
  }

  // public oAuthLogin():Observable<CustomToken>{
  //   return this.http.get<CustomToken>(`${this.baseURL}/login/oauth2/code/google`)
  //   .pipe(
  //     tap(data=>console.log('OAuth Login Respone',data))
  //   );
  // }

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


  handleGoogleCallback(): Observable<any> {
    return this.http.get(`${this.baseURL}/login/oauth2/code/google`);
  }
}

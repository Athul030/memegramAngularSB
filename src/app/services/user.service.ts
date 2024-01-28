import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomToken, User, UserCred } from '../model/user';
import { Observable } from 'rxjs';

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
    return this.http.post<string>(`${this.baseURL}/api/v1/auth/register`,user);

  }

  public logout(){
    return this.http.get(this.baseURL+'/logout');
  }
}

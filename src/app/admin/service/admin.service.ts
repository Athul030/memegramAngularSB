import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Post, User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private baseUrl:string="http://localhost:8080";

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/api/user/getAll`);
  }

  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseUrl}/api/posts`);
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/auth/logout`);
  }
}

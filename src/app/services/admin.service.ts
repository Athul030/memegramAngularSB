import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl:string="http://localhost:8080";

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/getAll`);
  }

  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getUser(username:string){
    return this.http.get<User>(`${this.baseUrl}/getUser/${username}`);
  }

  
}

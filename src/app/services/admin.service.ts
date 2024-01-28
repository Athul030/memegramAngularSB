import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl:string="http://localhost:8080";

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<User[]>(`${this.baseUrl}/getAll`);
  }

  getUser(username:string){
    return this.http.get<User>(`${this.baseUrl}/getUser/${username}`);
  }

  
}

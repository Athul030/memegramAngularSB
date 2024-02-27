import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Page, Post, PostDTO, User, UserDTO } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private baseUrl:string="http://localhost:8080";

  constructor(private http:HttpClient) { }

  // getAllUsers():Observable<User[]>{
  //   return this.http.get<User[]>(`${this.baseUrl}/api/user/getAll`);
  // }

  getAllUsers(page:number,size:number):Observable<Page<UserDTO>>{
    console.log("pageIndex:",page);
    console.log("Size of page:",size);
    const params = new HttpParams().set('page',page.toString()).set('size',size.toString());
    return this.http.get<Page<UserDTO>>(`${this.baseUrl}/api/user/getAll`,{params});
  }

  getAllUsersForDashboard():Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(`${this.baseUrl}/api/user/getAllUsers`);
  }

  getAllPostsForDashboard():Observable<PostDTO[]>{
    return this.http.get<PostDTO[]>(`${this.baseUrl}/api/getAllPosts`);
  }

  getAllPosts(page:number,size:number):Observable<Page<PostDTO>>{
    const params = new HttpParams().set('page',page.toString()).set('size',size.toString());
    return this.http.get<Page<PostDTO>>(`${this.baseUrl}/api/posts`,{params});
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/auth/logout`,{});
  }

  // toggleBlock(id:number):Observable<any>{
  //   retur ''
  // }
  

  blockUserByAdmin(userId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/admin/blockUser/${userId}`, null);
  }

  unBlockUserByAdmin(userId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/admin/unBlockUser/${userId}`, null); 
  }
}

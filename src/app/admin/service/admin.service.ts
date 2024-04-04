import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/environments/environment';
import { Page, Post, PostDTO, PostsGraphData, ProviderChartData, User, UserDTO } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private baseUrl:string=`${environment.apiUrl}`;

  constructor(private http:HttpClient, private service:StorageService) { }



  getAllUsers(page:number,size:number):Observable<Page<UserDTO>>{
    console.log("pageIndex:",page);
    console.log("Size of page:",size);
    const params = new HttpParams().set('page',page.toString()).set('size',size.toString());
    return this.http.get<Page<UserDTO>>(`${this.baseUrl}/api/user/getAll`,{params});
  }

  getAllUsersForDashboard():Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(`${this.baseUrl}/api/user/getAllUsers`);
  }

  getProviderChartData():Observable<ProviderChartData>{
    return this.http.get<ProviderChartData>(`${this.baseUrl}/api/admin/providerChartData`);
  }

  getPostsChartData():Observable<PostsGraphData>{
    return this.http.get<PostsGraphData>(`${this.baseUrl}/api/admin/postsChartData`);
  }

  getAllPostsForDashboard():Observable<PostDTO[]>{
    return this.http.get<PostDTO[]>(`${this.baseUrl}/api/getAllPosts`);
  }

  getAllPosts(page:number,size:number):Observable<Page<PostDTO>>{
    const params = new HttpParams().set('page',page.toString()).set('size',size.toString());
    return this.http.get<Page<PostDTO>>(`${this.baseUrl}/api/posts`,{params});
  }

  logout(): Observable<void> {
    
    return this.http.post<void>(`${this.baseUrl}/api/v1/auth/logout`,{});
  }

  removePresence(userId: number): void {
    this.http.post<void>(`${this.baseUrl}/api/v1/auth/removeUserPresence/${userId}`, {}).subscribe(
      () => {
        console.log(`Successfully removed presence for user with ID ${userId}`);
      },
      (error) => {
        console.error('Error removing user presence:', error);
      }
    );
  }


  

  blockUserByAdmin(userId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/admin/blockUser/${userId}`, null);
  }

  unBlockUserByAdmin(userId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/admin/unBlockUser/${userId}`, null); 
  }

  blockPostByAdmin(postId:number):Observable<any>{
    return this.http.patch(`${this.baseUrl}/api/admin/blockPost/${postId}`,null);
  }

  unBlockPostByAdmin(postId:number):Observable<any>{
    return this.http.patch(`${this.baseUrl}/api/admin/unBlockPost/${postId}`,null);
  }
}

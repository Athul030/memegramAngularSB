import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { PostDTO } from '../model/user';
import { NotificationsDTO } from '../model/notification';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient, private storage:StorageService) { }

  baseURL:string = `${environment.apiUrl}`;

  public getPostCount():Observable<number>{
    
    return this.http.get<number>(`${this.baseURL}/api/postCountOfUser`);
  }

  public getPostCountForOtherUser(userId:number):Observable<number>{
    
    return this.http.get<number>(`${this.baseURL}/api/postCountOfUser/${userId}`);
  }

  public getPostsByUser():Observable<PostDTO[]>{
    
    return this.http.get<PostDTO[]>(`${this.baseURL}/api/user/posts`);
  }

  public getPostsByOtherUser(userId:number):Observable<PostDTO[]>{
    
    return this.http.get<PostDTO[]>(`${this.baseURL}/api/user/posts/${userId}`);
  }

  
}

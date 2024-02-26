import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { PostDTO } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient, private storage:StorageService) { }

  baseURL:string = "http://localhost:8080";

  public getPostCount():Observable<number>{
    
    return this.http.get<number>(`${this.baseURL}/api/postCountOfUser`);
  }

  public getPostsByUser():Observable<PostDTO[]>{
    
    return this.http.get<PostDTO[]>(`${this.baseURL}/api/user/posts`);
  }
}

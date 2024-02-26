import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { LikeResponse } from '../model/likeComment';

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {

  constructor(private http:HttpClient, private storage:StorageService) { }

  baseURL:string = "http://localhost:8080";

  likePost(userId: number, postId: number): Observable<LikeResponse> {
    const likeRequestBody = { userIdOfPersonLiking: userId, postId };
    console.log(likeRequestBody);
    return this.http.post<LikeResponse>(`${this.baseURL}/like`, likeRequestBody);
  }

  unlikePost(userId: number, postId: number): Observable<LikeResponse> {
    const likeRequestBody = { userIdOfPersonLiking: userId, postId };
    console.log(likeRequestBody);
    return this.http.post<LikeResponse>(`${this.baseURL}/unlike`, likeRequestBody);
  }
}

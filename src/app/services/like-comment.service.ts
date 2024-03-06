import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { ApiResponseCustom, CommentDTO, LikeResponse } from '../model/likeComment';

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

  addComment(postId: number, userId: number, commentText:string): Observable<CommentDTO> {
    const addCommentRequest = { postId, userId, commentText };
    return this.http.post<CommentDTO>(`${this.baseURL}/addComment`, addCommentRequest);
  }

  deleteComment(commentId: number): Observable<void> {
    
    return this.http.delete<void>(`${this.baseURL}/deleteComment/${commentId}`);
  }

  getAllComments(postId: number): Observable<CommentDTO[]>{
    console.log("Inside getallcomments");

    return this.http.get<CommentDTO[]>(`${this.baseURL}/getAllComments/${postId}`);
  }

}

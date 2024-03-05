import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { FollowRequestBody, FollowerFollowingCount, FollowerFollowingDetails } from '../model/followDetails';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http:HttpClient, private storage:StorageService) { }

  baseURL:string = "http://localhost:8080";

  public getFollowerFollowingCount():Observable<FollowerFollowingCount>{
    return this.http.get<FollowerFollowingCount>(`${this.baseURL}/followerAndFollowingDetails`);
  }

  public getFollowerFollowingCountOfOtherUser(userId:number):Observable<FollowerFollowingCount>{
    return this.http.get<FollowerFollowingCount>(`${this.baseURL}/followerAndFollowingDetails/${userId}`);
  }

  

  public getFollowerFollowingDetails():Observable<FollowerFollowingDetails>{
    return this.http.get<FollowerFollowingDetails>(`${this.baseURL}/followerAndFollowingDetails`);
  }

  public removeFollower(followRequestBody: FollowRequestBody):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/unfollow`,followRequestBody);
  }

  public unfollow(followRequestBody: FollowRequestBody):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/unfollow`,followRequestBody);
  }

  public follow(followRequestBody: FollowRequestBody):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/follow`,followRequestBody);
  }
}

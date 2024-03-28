import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomToken, JwtAuthResponse, Post, User, UserBlockRequest, UserCred, UserDTO } from '../model/user';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL:string = `${environment.apiUrl}`;

  constructor(private http:HttpClient, private storage:StorageService) { }

  public login(userCred:UserCred):Observable<CustomToken>{
    
    return this.http.post<CustomToken>(`${this.baseURL}/api/v1/auth/login`,userCred);
  }

  // public refreshToken():Observable<JwtAuthResponse>{
  //   const refreshToken:string|null = this.storage.getRefreshToken();
  //   if (refreshToken !== null) {
  //   const formData = new FormData();
  //   formData.append('refreshToken', refreshToken);
  //   console.log("enter+" + formData.get('refreshToken'));
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.post<JwtAuthResponse>(`${this.baseURL}/api/v1/auth/refreshToken`,formData,{headers});
  //   } else {
  //     return throwError('Refresh token not available');
  //   }
  // }

  // public refreshToken():Observable<JwtAuthResponse>{
  //   const refreshToken:string|null = this.storage.getRefreshToken();

  //   return this.http.post<JwtAuthResponse>(`${this.baseURL}/api/v1/auth/refreshToken?refreshToken=${refreshToken}`, {});
  
  // }

  public refreshToken():Observable<JwtAuthResponse>{
    const refreshToken:string|null = this.storage.getRefreshToken();
    
    return this.http.post<JwtAuthResponse>(`${this.baseURL}/api/v1/auth/refreshToken`, { refreshToken }, {})
    .pipe(
      map((response) => {
        console.log('Refresh Service Method', response);
        return response;
    }),
    catchError((error) => {
      console.error('Error in service method:', error);
      return throwError(error);
    })
  );
  }



  public checkAuthentication(): Observable<CustomToken> {
    return this.http.get<CustomToken>(`${this.baseURL}/callback`);
  }


  public getCurrentUser():Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.baseURL}/api/user/currentUser`);
  }

  public getOtherUser(userId:number):Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.baseURL}/api/user/${userId}`);
  }

  public testMethod():Observable<string>{
    return this.http.get(`${this.baseURL}/api/user/test`,{responseType:'text'});
  }

  

  public registerUser(user:User):Observable<string>{
    return this.http.post<string>(`${this.baseURL}/api/v1/auth/register`,user)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        if (error instanceof HttpErrorResponse && error.status === 400 && error.error === 'Email already exists')

        {
          return throwError('Email alread in use');
        }else{
          return throwError('An error occurred. Please try again.');
        }
      })
    )
    ;

  }

  public logout(){
    return this.http.get(`${this.baseURL}/logout`);
  }


  handleGoogleCallback(): Observable<any> {
    return this.http.get(`${this.baseURL}/login/oauth2/code/google`);
  }

  // createPost(post:Post, categoryId:number,file:File):Observable<any>{

  //   const formData = new FormData();
  //   formData.append('post',JSON.stringify(post));
  //   formData.append('categoryId', categoryId.toString());
  //   formData.append('file',file);

  //   return this.http.post<Post>(`${this.baseURL}/api/createPost`,formData);
  // }

  createPost(postDTO:Post, categoryId:number,file:File):Observable<any>{
    const url = `${this.baseURL}/api/createPost`;

  const formData: FormData = new FormData();
  formData.append('postDTO', new Blob([JSON.stringify(postDTO)], { type: 'application/json' }));
  formData.append('categoryId', categoryId.toString());
  formData.append('file', file, file.name);
  return this.http.post<Post>(url, formData,  { observe: 'response' });
  }



  //change the Profile picture in my side bar
  
  changeDP(file:File):Observable<HttpResponse<{fileUrl: string}>>{
  const url = `${this.baseURL}/files/`;
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  return this.http.post<{fileUrl: string}>(url, formData,  { observe: 'response' });
  }

  
  getAllPostsForFeed():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseURL}/api/getAllPosts`);
  }

  blockUser(userBlockRequest:UserBlockRequest):Observable<UserDTO>{
    return this.http.post<UserDTO>(`${this.baseURL}/api/user/userBlock`,userBlockRequest);
  }

  unBlockUser(userBlockRequest:UserBlockRequest):Observable<UserDTO>{
    return this.http.post<UserDTO>(`${this.baseURL}/api/user/userUnBlock`,userBlockRequest);
  }

  toggleProfileType(publicProfile:boolean):Observable<boolean>{
    return this.http.patch<boolean>(`${this.baseURL}/api/user/toggleProfileType?publicProfile=${publicProfile}`,{})
  }

  reportUser(userId:number,postId:number,reason:string):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/api/user/reportUser/${postId}/${userId}`,reason);
  }
  
}

import { Injectable } from '@angular/core';
import { User, refershTokenForSending } from '../model/user';

const USER='user';
const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {



  constructor() { }


  public saveUser(user:User){
    localStorage.removeItem("user");
    window.localStorage.setItem("user",JSON.stringify(user));
  }

  public saveAccessToken(acessToken:any){
    localStorage.removeItem("accessToken");
    localStorage.setItem("accessToken",acessToken);

  }

  public saveRefreshToken(refreshToken:any){
    localStorage.removeItem("refreshToken");
    localStorage.setItem("refreshToken",refreshToken);

  }

  public getAccessToken(): string|null{
    return localStorage.getItem('accessToken');
  }
  public getRefreshToken(): string|null{
    return localStorage.getItem('refreshToken');
  }

  public static getTokens(): string | null{
    return localStorage.getItem("token");
  }

  public static getUser() : User | null{
    const user = localStorage.getItem('user');

    if(typeof user === 'string'){
      const userParsed = JSON.parse(user) as User;
      return userParsed;
    }else{
      return null;
    }
  }

  public isLoggedIn():boolean{
    if(localStorage.getItem("user")!==null){
      return true;
    }
    return false;
  }

  

  static hasToken():boolean{
    if(this.getTokens()  === null) {
      return false;
    }
    return true;
  }

  static isAdminLoggedIn():boolean{
    if(this.getTokens === null){
      return false;
    }
    const user = this.getUser();
    let role:string|null='';
    if(user!=null && user.roles!==undefined){
      role = user.roles[0].name;
    }
    if(typeof(role) === 'string'){
      return role === "ADMIN";
    }
    return false;
  }

  static isUserLoggedIn():boolean{
    if(this.getTokens() === null){
      return false;
    }
    const user = this.getUser();
    let role:string | null = '';
    if(user!==null && user.roles!==undefined){
      role = user.roles[0].name;
    }
    if(typeof(role) === 'string'){
      return role === "USER";
    }
    return false;
  }

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");

  }

  public getUserId():number {
    const userString = localStorage.getItem('user');
    let id:number=-1;
    if(userString){
      const user = JSON.parse(userString);
      if(user && user.id !==undefined){
        id=user.id
      }
    }
    return id;

  }



}

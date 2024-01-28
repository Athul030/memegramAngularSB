import { Injectable } from '@angular/core';
import { User } from '../model/user';

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

  public saveToken(token:any){
    localStorage.removeItem("token");
    localStorage.setItem("token",token);
  }

  public getToken(): string|null{
    return localStorage.getItem("token");
  }

  public static getTokens(): string | null{
    return localStorage.getItem("token");
  }

  public static getUser() : User | null{
    const user = localStorage.getItem('user');

    if(typeof user == 'string'){
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
    if(user!=null && user.authorities!=undefined){
      role = user.authorities[0].authority;
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
    if(user!==null && user.authorities!==undefined){
      role = user.authorities[0].authority;
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



}

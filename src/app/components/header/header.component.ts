import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/admin/service/admin.service';
import { StorageService } from 'src/app/services/storage.service';
// import { removeUserFromPresence } from 'src/app/store/store.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private adSservice:AdminService, private serviceNow: StorageService,private router:Router, private store:Store){  }

  showHeader:boolean = true;
  
  currentUserId:number=this.serviceNow.getUserId();

  isLoginOrRegisterRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }

  logout():void{
    console.log("logout clicked");
    // if(this.currentUserId !== undefined){
    //   this.store.dispatch(removeUserFromPresence({userId:this.currentUserId}));
    // }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    this.adSservice.logout().subscribe(
      (respones)=>{
        this.router.navigate(['login'])
        console.log("respone"+respones);
      },(error) => {
        console.error('Logout failed', error);
        // handle logout failure 
      }
    )
  }

  
}

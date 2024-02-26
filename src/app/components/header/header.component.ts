import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/service/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private adSservice:AdminService, private serviceNow: StorageService,private router:Router){  }

  showHeader:boolean = true;
  
  

  isLoginOrRegisterRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }

  logout():void{
    console.log("logout clicked");
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

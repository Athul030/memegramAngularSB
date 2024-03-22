import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  constructor(private router:Router, private service:AdminService){
  }

  logout():void{
    console.log("logout clicked");
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    
    
    this.service.logout().subscribe(
      (respone)=>{
        console.log("respone"+respone);
      },(error) => {
        console.error('Logout failed', error);
        // Handle the logout failure
      }
    )
  }
}

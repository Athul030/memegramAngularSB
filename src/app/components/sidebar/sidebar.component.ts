import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private service:AdminService){}

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
        // Handle logout failure if needed
      }
    )
  }

}

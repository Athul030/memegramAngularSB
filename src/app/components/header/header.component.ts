import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private serviceNow: StorageService,private router:Router){  }

  showHeader:boolean = true;
  
  logout(){
    this.serviceNow.logout();
    this.router.navigate(['login'])
  }

  isLoginOrRegisterRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router:Router){  }

  isLoginOrRegisterRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }

}

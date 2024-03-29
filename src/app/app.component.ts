import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Picker } from 'emoji-picker-element'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'memegramAngular';

  constructor(private router: Router) {

  this.router.events.subscribe((event) => {
    if (event instanceof NavigationStart) {
      // Check the current route and set a style 
      const isLoginPage = event.url === '/login';
      document.body.classList.toggle('login-background', isLoginPage);
    }
  });
}

}

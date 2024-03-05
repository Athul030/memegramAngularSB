import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isOwnProfile:boolean  = false;
  otherUserId!:number;
  constructor(private router:Router, private route:ActivatedRoute){}
  ngOnInit(): void {
    

    this.route.params.subscribe( params => {
      if(params['userId']){
        this.isOwnProfile = false;
        this.otherUserId = params['userId'];
      }else{
        this.isOwnProfile = true;
      }
    })

  }


  

  isLoginOrRegisterRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }

  navigateToUserProfile(userId:number):void{
    this.router.navigate(['/profile',userId]);
  }
}

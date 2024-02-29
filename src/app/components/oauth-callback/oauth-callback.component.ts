import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToken } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {

  responseData:CustomToken | null = null;

  constructor(private route:ActivatedRoute, private storageSer:StorageService,private router:Router){}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params =>{
  
        if(params['response']){
          this.responseData= JSON.parse(decodeURIComponent(params['response']));
          console.log('Response'+JSON.stringify(this.responseData));
          if(this.responseData!=null){
            
        this.storageSer.saveAccessToken(this.responseData.accessToken);
        this.storageSer.saveRefreshToken(this.responseData.refreshToken);
        this.storageSer.saveUser(this.responseData.user);
          }
        this.router.navigate(['home']);

        }
      })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToken } from 'src/app/model/user';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {

  responseData:CustomToken | null = null;

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params =>{
        console.log("insideoauthcallback");
        if(params['response']){
          this.responseData= JSON.parse(decodeURIComponent(params['response']));
          console.log('Response'+this.responseData);
        }
      })
  }

}

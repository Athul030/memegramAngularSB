import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';
import { VideocallService } from 'src/app/services/videocall.service';
import { loginSuccess } from 'src/app/store/store.actions';

@Component({
  selector: 'app-videocall3',
  templateUrl: './videocall3.component.html',
  styleUrls: ['./videocall3.component.css']
})
export class Videocall3Component implements OnInit {

  userId!:number;
  otherUserId!:number;
  currentUser!:User|null;
  roomid?:number;
  constructor(private route:ActivatedRoute,private router:Router, private videoCallSer:VideocallService){}

  ngOnInit(): void {
    const user = StorageService.getUser();
    this.currentUser = user;

    this.route.params.subscribe( params => {
      if (params['roomID']) {
        this.roomid = params['roomID'];
        // if(this.roomid!==undefined && this.currentUser){
        //   this.videoCallSer.sendVideoCallNotification(this.roomid,this.currentUser);
        // }
        if(this.roomid)
        this.handleJoinMeeting(this.roomid);
        
      }else{
        this.otherUserId = params['otherUserId'];
        this.router.navigate(['/videoScreen',this.otherUserId]);
      }
    })
  }

  navigateToVideoScreen():void{
    this.router.navigate(['/videoScreen']);
  }



  handleJoinMeeting(roomId:number): void {
   
    if(this.currentUser?.fullName){
    const connectedUserName:string  = this.currentUser.fullName;
    const url = this.router.createUrlTree(['/videoScreen'], {
      queryParams: {
        roomID: roomId,
        username: connectedUserName
      }
    }).toString();
    // Open the meeting URL in a new tab
    window.open(url, "_blank");
    }
    
  }

  

}

import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { VideocallService } from 'src/app/services/videocall.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-videocall-screen',
  templateUrl: './videocall-screen.component.html',
  styleUrls: ['./videocall-screen.component.css']
})
export class VideocallScreenComponent implements OnInit,OnDestroy {
  
  otherUserId!:number;
  queryParamsSubscription: Subscription | undefined;
  zegoInstance: any;


  constructor(private route: ActivatedRoute, private storageSer:StorageService, private renderer: Renderer2, private videoCallSer:VideocallService, private router:Router) { }



  ngOnInit() {

    const user = StorageService.getUser();

     this.route.params.subscribe( params => {
      if (params['otherUserId']) {
        this.otherUserId = params['otherUserId'];
      }
    }
     );
    this.route.queryParams.subscribe(params => {
      
      const roomID = params['roomID'] || (Math.floor(Math.random() * 10000) + "");
      const userID = Math.floor(Math.random() * 10000) + "";
      const userName = user?.fullName;
      const appID = environment.appId;
      const serverSecret = environment.serverSecret;
      

      if(user)
      this.videoCallSer.sendVideoCallNotification(roomID,user,this.otherUserId);

      console.log("The zegoinstance is"+this.zegoInstance);
      
      if (!this.zegoInstance) {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
        this.zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
        this.joinRoom(roomID);
      }
      console.log("The zegoinstance is"+this.zegoInstance);
    });
    //   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
    //   const zp = ZegoUIKitPrebuilt.create(kitToken);
    //   zp.joinRoom({
    //     container: document.querySelector("#root") as HTMLElement,
    //     sharedLinks: [{
    //       name: 'Personal link',
    //       url: window.location.protocol + '//' + window.location.host  + window.location.pathname + '?roomID=' + roomID,
    //     }],
    //     scenario: {
    //       //changed
    //       mode: ZegoUIKitPrebuilt.OneONoneCall,
    //     },
    //     turnOnMicrophoneWhenJoining: false,
    //     turnOnCameraWhenJoining: false,
    //     showMyCameraToggleButton: true,
    //     showMyMicrophoneToggleButton: true,
    //     showAudioVideoSettingsButton: true,
    //     showScreenSharingButton: false,
    //     showTextChat: false,
    //     showUserList: false,
    //     maxUsers: 2,
    //     layout: "Auto",
    //     showLayoutButton: false,
    //   });
    // });
  }

  joinRoom(roomID: string) {
    this.zegoInstance.joinRoom({
      container: document.querySelector("#root") as HTMLElement,
      sharedLinks: [{
        name: 'Personal link',
        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: false,
      showTextChat: false,
      showUserList: false,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
  }

  navigateToChat():void{
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {

    if (this.queryParamsSubscription) {
      ZegoUIKitPrebuilt._instance.destroy;

      this.queryParamsSubscription.unsubscribe();
    }
  }
  
  
}

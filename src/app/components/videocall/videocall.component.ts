import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { UserDTO } from 'src/app/model/user';
import { VideoCall } from 'src/app/model/videocall';
declare var Notification:any;

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {

  rtc:VideoCall=new VideoCall();
  constructor(private router:Router, private route:ActivatedRoute){}

  userId!:number;
  otherUserId!:number;

  ngOnInit(): void {

    this.route.params.subscribe( params => {
      if (params['userId'] && params['otherUserId']) {
        this.userId = params['userId'];
        this.otherUserId = params['otherUserId'];
        
        
        
      }else{
        console.error("Error, no datas in params")
      }
    })

  

    if(Notification.permission !== 'granted' && Notification.permission !=='denied'){
      Notification.requestPermission();
    }
    

      this.rtc.rtc.client = AgoraRTC.createClient({
        mode:'rtc',
        codec:'vp8',
        websocketRetryConfig:{
          timeout:10,
          timeoutFactor:0,
          maxRetryCount:1,
          maxRetryTimeout:2000,
        }
      });

      this.rtc.rtc.client.on('user-published',async(user:any,mediaType:any)=>{
        await this.rtc.rtc.client.subscribe(user,mediaType);
        

        
        

        if(mediaType ==='video'){
          const remoteVideoTrack = user.videoTrack;
          const incomingVideoContainer = document.querySelector('.outgoing-video');
          if(incomingVideoContainer){
            remoteVideoTrack.play(incomingVideoContainer);
          }
        }

        if(mediaType === 'audio'){
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
        this.showNotification('Incoming Call', `You have an incoming call from ${user.uid}`);
        this.rtc.rtc.client.on('user-unpublished',(user:any)=>{
          if(user){
            const remotePlayContainer : any = document.getElementById(user.id);
            if(remotePlayContainer){
              remotePlayContainer.remove();
            }
          }
        });
      });
  }


  showNotification(title: string, body: string):void {
    if(Notification.permission === 'granted'){
      new Notification(title,{body});
    }else if(Notification.permission !== 'denied'){
      Notification.requestPermission().then((permission: string)=>{
        if(permission === 'granted'){
          new Notification(title,{body});
        }
      });
    }
  }

  async joinCall(){
    await this.rtc.rtc.client.join(
      this.rtc.options.appId,
      this.rtc.options.channel,
      this.rtc.options.token
    );
    this.rtc.micBtn = false;
    this.rtc.videoBtn = false;

    this.rtc.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    this.rtc.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig:'4809_1',
    });
    await this.rtc.rtc.client.publish([
      this.rtc.rtc.localAudioTrack,
      this.rtc.rtc.localVideoTrack,
    ]);

    const videoPlayerContainer = document.querySelector('.incoming-video');
    this.rtc.rtc.localVideoTrack.play(videoPlayerContainer);
  }

  async leaveCall(){
    await this.rtc.rtc.client.leave();
    this.rtc.micBtn=true;
    this.rtc.videoBtn = true;
    this.rtc.rtc.localAudioTrack.close();
    this.rtc.rtc.localVideoTrack.close();

    this.rtc.rtc.client.remoteUsers.forEach((user:any)=>{
      const playerContainers = document.querySelectorAll('.remote-video-container');
      playerContainers.forEach((container:Element)=>{
        const containerAsHtmlElement = container as HTMLElement;
        if(containerAsHtmlElement.id === user.uid.toString()){
          containerAsHtmlElement.remove();
        }
      })
    })
    

  }


  async mute(){
    this.rtc.micIcon = !this.rtc.micIcon;
    this.rtc.muteIcon = !this.rtc.muteIcon;
    this.rtc.rtc.micBtn = this.rtc.muteIcon; 
    this.rtc.rtc.localAudioTrack.setEnabled(!this.rtc.muteIcon);
  }

  async videoOnOff(){
    this.rtc.videoIcon = !this.rtc.videoIcon;
    this.rtc.videooffIcon = !this.rtc.videooffIcon;
    this.rtc.rtc.videoBtn = this.rtc.videooffIcon;
    this.rtc.rtc.localVideoTrack.setEnabled(!this.rtc.videooffIcon);
  }


  navigateToChat():void{
    this.router.navigate(['/chat']);
  }
}

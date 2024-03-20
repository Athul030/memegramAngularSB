import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { MessageType } from '../model/message';
import { ActivatedRoute } from '@angular/router';
import { track } from 'logrocket';
import { DialogConfig } from '@angular/cdk/dialog';
import { BehaviorSubject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import { User } from '../model/user';
import { NotificationType, NotificationsDTO } from '../model/notification';


@Injectable({
  providedIn: 'root'
})
export class VideocallService {

  baseURL:string = "http://localhost:8080";
  private stompClient: any

  private userIdForWebRTCSource = new BehaviorSubject<number>(0);
  userIdForWebRTC$ = this.userIdForWebRTCSource.asObservable();

  constructor(private http:HttpClient,private route:ActivatedRoute,
    ) { 
      this.initConnenctionSocket();
  }

  initConnenctionSocket() {
    const url = 'ws://localhost:8080/socket';
    this.stompClient = Stomp.client(url);

    this.stompClient.connect({}, () => {
      console.log('WebSocket connection established.');
    }, (error: any) => {
      console.error('WebSocket connection failed:', error);
    });
    
  }

  setUserIdForWebRTC(userId:number):void{
    this.userIdForWebRTCSource.next(userId);
  }

  ngOnInit(){
    
  }


  //modify it like in chat service ts
  sendVideoCallNotification(roomId: number,user:User,otherUserId:number) {
    console.log("inside sendVideoCallNotification");
    
    if(!this.stompClient.connected){
      console.error('WebSocket connection not established. Please reconnect');
      return;
    }
    if(user.id===undefined){
      return;
    }

    let notificationsDTO:NotificationsDTO;
    notificationsDTO={
      notificationType:NotificationType.VIDEOCALL,
      notificationFrom: user.id,
      notificationFromFullName:user.fullName,
      read:false,
      videoCallRoomId: roomId,
      notificationTo:otherUserId
    }    
    this.stompClient.send(`/app/videoCall`,{}, JSON.stringify(notificationsDTO));

  }

  sendVideoCallDeclineNotification(user:User,otherUserId:number) {
    console.log("inside sendVideoCallDeclineNotification");
    
    if(!this.stompClient.connected){
      console.error('WebSocket connection not established. Please reconnect');
      return;
    }
    if(user.id===undefined){
      return;
    }

    let notificationsDTO:NotificationsDTO;
    notificationsDTO={
      notificationType:NotificationType.DECLINE,
      notificationFrom: user.id,
      notificationFromFullName:user.fullName,
      read:false,
      notificationTo:otherUserId 
    }    
    this.stompClient.send(`/app/videoCall`,{}, JSON.stringify(notificationsDTO));

  }
  

  

  
  



}

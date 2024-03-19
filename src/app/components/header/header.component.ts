import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Stomp } from '@stomp/stompjs';
import { log } from 'logrocket';
import { AdminService } from 'src/app/admin/service/admin.service';
import { NotificationsDTO } from 'src/app/model/notification';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';
import { resetProfilePicture } from 'src/app/store/store.actions';
// import { removeUserFromPresence } from 'src/app/store/store.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showNotifications:boolean=false;
  notificationList!:NotificationsDTO[];
  currentUserId:number = this.serviceNow.getUserId();
  notificationCount:number=0;
  private stompClient: any
  groupedNotifications :{[key:string]:NotificationsDTO[]} = {}
  a:number=1;
  constructor(private adSservice:AdminService, private serviceNow: StorageService,private router:Router, private store:Store, private chatSer:ChatService, private notfSer:NotificationsService){ 
    this.initConnenctionSocket();
   }
  ngOnInit(): void {

    this.initConnenctionSocket();
    this.getMessageNotificationDetails();

  }

  showHeader:boolean = true;
  
  getMessageNotificationDetails(){

    this.notfSer.getMessageNotificationsDetails(this.currentUserId).subscribe((notifications:NotificationsDTO[])=>{

      this.groupedNotifications = {};
      notifications.forEach(notification=>{
        const senderId = notification.notificationFromUserId?.toString();
        const chatRoomId = notification.chatRoomId;
    

        
        if(senderId!==undefined && chatRoomId!==undefined){
          const key = `${senderId}_${chatRoomId}`;
      

          if (!this.groupedNotifications[key]) {
          this.groupedNotifications[key] = [];

          console.log("2.3");

        }

          this.groupedNotifications[key].push(notification)
          console.log("the grouped not  is"+this.groupedNotifications);

          console.log("2.4");

        }
      })
      console.log("2.5");
      
      this.notificationList = notifications;
      this.notificationCount = this.notificationList.length;
      this.calculateNotificationCount();
    });
  }

  
  initConnenctionSocket() {

    const url = 'ws://localhost:8080/socket';
    this.stompClient = Stomp.client(url);

    this.stompClient.connect({}, ()=>{     
      this.stompClient.subscribe(`/topic/notifications`, (notifications: NotificationsDTO[]) => {
        this.notificationList = notifications;
        this.notificationCount = this.notificationList.length;
        
        if(this.notificationList.length === 0 || this.notificationList.length == undefined){
          this.notificationCount = 0;
        }
        })
      })
  }

  isLoginOrRegisterRoute(): boolean {

    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }

  logout():void{

    console.log("logout clicked");
    this.store.dispatch(resetProfilePicture())

    this.adSservice.removePresence(this.serviceNow.getUserId());
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    this.store.dispatch(resetProfilePicture())
    this.adSservice.logout().subscribe(
      (respones)=>{
        this.router.navigate(['login'])
        console.log("respone"+respones);
      },(error) => {
        console.error('Logout failed', error);
      }
    )
  }

  toggleNotifications(){

    this.showNotifications = !this.showNotifications;
    this.getMessageNotificationDetails();
    

  }


  navigateToChat(chatRoomId:string):void{

    // if(chatRoomId === undefined){
    //   return;
    // }
    console.log("inside navigatetochat",chatRoomId);

    // do it later to set the isread true
    // for (const notification of this.groupedNotifications[key]) {
    //   notification.isRead = true;
    // }
    
    this.router.navigate(['/chat',chatRoomId]);
  }

  calculateNotificationCount():void{

    let totalCount = 0;
    for(const key in this.groupedNotifications){
      totalCount+=this.groupedNotifications[key].length;
    }
    this.notificationCount = totalCount;
  }

  getGroupedNotificationKeys():string[]{
    return Object.keys(this.groupedNotifications || {});
  }

  getGroupedNotificationsCount(): number {

    return Object.keys(this.groupedNotifications).length;

  }
  


  getNotificationFullName(userId: string): string {

    const notifications = this.groupedNotifications[userId];
    if (notifications && notifications.length > 0) {
      const firstNotification = notifications[0];
      return firstNotification.notificationFromFullName || 'Unknown User';
    }
    return 'Unknown User';
  }



  
  
}

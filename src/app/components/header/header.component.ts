import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Stomp } from '@stomp/stompjs';
import { AdminService } from 'src/app/admin/service/admin.service';
import { NotificationType, NotificationsDTO } from 'src/app/model/notification';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';
import { resetProfilePicture } from 'src/app/store/store.actions';
import { VideoCallerIdComponent } from '../video-caller-id/video-caller-id.component';
import { VideocallService } from 'src/app/services/videocall.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ChatLeftSectionComponent } from '../chat-left-section/chat-left-section.component';
import { ChatRightSectionComponent } from '../chat-right-section/chat-right-section.component';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  showNotifications:boolean=false;
  notificationList!:NotificationsDTO[];
  currentUserId:number = this.serviceNow.getUserId();
  currentUser = StorageService.getUser();


  notificationCount:number=0;
  private stompClient: any
  groupedNotifications :{[key:string]:NotificationsDTO[]} = {}
  a:number=1;
  constructor(private adSservice:AdminService, private serviceNow: StorageService,private router:Router, private store:Store, private chatSer:ChatService, private notfSer:NotificationsService,private dialog: MatDialog, private videoSer:VideocallService, private snackBar:MatSnackBar, private notificationService:NotificationsService){ 
    this.initConnenctionSocket();

   }
  ngOnInit(): void {

    this.initConnenctionSocket();
    this.getMessageNotificationDetails();
    this.subscribeToChatNotificationStatusUpdate();

    console.log("Starts at navigateToChat8");

  }

  showHeader:boolean = true;

  subscribeToChatNotificationStatusUpdate(): void {
    this.notificationService.notificationStatusUpdated$.subscribe(() => {
      this.getMessageNotificationDetails();
    });
  }
  
  

  getMessageNotificationDetails(){
    this.notfSer.getMessageNotificationsDetails(this.currentUserId).subscribe((notifications:NotificationsDTO[])=>{
      notifications = notifications.filter(e=>e.read===false);
      this.groupedNotifications = {};
      notifications.forEach(notification=>{
        const senderId = notification.notificationFromUserId?.toString();
        const chatRoomId = notification.chatRoomId;
    

        
        if(senderId!==undefined && chatRoomId!==undefined){
          const key = `${senderId}_${chatRoomId}`;
          if (!this.groupedNotifications[key]) {
          this.groupedNotifications[key] = [];
        }
          this.groupedNotifications[key].push(notification)
        }
      })      
      this.notificationList = notifications;
      this.notificationCount = this.notificationList.length;
      this.calculateNotificationCount();
    });
  }

  
  initConnenctionSocket() {

    const url = `${environment.apiUrlWS}/socket`;
    this.stompClient = Stomp.client(url);

    this.stompClient.connect({}, ()=>{     
      this.stompClient.subscribe(`/topic/notifications`, (notifications: NotificationsDTO[]) => {
        this.getMessageNotificationDetails();

        this.notificationList = notifications;
        this.notificationCount = this.notificationList.length;
        
        if(this.notificationList.length === 0 || this.notificationList.length == undefined){
          this.notificationCount = 0;
        }
        });
      this.stompClient.subscribe(`/topic/videoCallTo`,(message: any)=>{
        if (message.body) {
          const notificationsDTO: NotificationsDTO = JSON.parse(message.body);
          console.log("Inside  initConnenctionSocket  in header componenet");
          console.log("notification type",notificationsDTO);


          if( notificationsDTO.notificationTo===this.currentUser?.id && notificationsDTO.notificationType === NotificationType.VIDEOCALL){
            const dialogRef = this.dialog.open(VideoCallerIdComponent, {
              width: '400px',
              data: { callerName: notificationsDTO.notificationFromFullName }
            });
          
            dialogRef.afterClosed().subscribe(result => {
              if (result === 'accept') {
                if(notificationsDTO.videoCallRoomId){
                this.handleJoinMeeting(notificationsDTO.videoCallRoomId);
                dialogRef.close();
                }
              
              } else if(result=='decline') {
                if(this.currentUser && notificationsDTO && notificationsDTO.notificationTo !== undefined){
                  this.videoSer.sendVideoCallDeclineNotification(this.currentUser,notificationsDTO.notificationFrom);
                }
                dialogRef.close();
              }
            });

          }else if(notificationsDTO.notificationTo===this.currentUser?.id && notificationsDTO.notificationType === NotificationType.DECLINE){
            console.log("Inside  initConnenctionSocket  in header componenet");

            const config = new MatSnackBarConfig();
            config.duration = 3000; // Duration in milliseconds (3 seconds in this example)
            this.snackBar.open(`Your call to ${notificationsDTO.notificationFromFullName} is declined`, 'Dismiss', config);

          }
        }
      } 
        );

      });
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
    window.open(url, "_blank");
    }
    
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
    console.log("Starts at navigateToChat1");
    
    this.getMessageNotificationDetails();
    
    console.log("inside navigatetochat",chatRoomId);

    // do it later to set the isread true
    // for (const notification of this.groupedNotifications[key]) {
    //   notification.isRead = true;
    // }
    
    this.router.navigate(['/chat',chatRoomId]);
    console.log("Starts at navigateToChat2");

    this.getMessageNotificationDetails();
    console.log("Starts at navigateToChat3");


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

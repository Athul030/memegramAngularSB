import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { error } from 'logrocket';
import { Observable, map } from 'rxjs';
import { ChatRoomDTO } from 'src/app/model/message';
import { User, UserDTO } from 'src/app/model/user';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chat-left-section',
  templateUrl: './chat-left-section.component.html',
  styleUrls: ['./chat-left-section.component.css']
})
export class ChatLeftSectionComponent implements OnInit  {

  @Input() followersList!:UserDTO[];
  @Input() followingList!:UserDTO[];
  constructor(private chatService: ChatService,private storgSer:StorageService, private store:Store,private route: ActivatedRoute, private notificationService:NotificationsService) {

  }
  @Output() userSelected:EventEmitter<{user:UserDTO,chatRoomId:string}> = new EventEmitter();
  // @Output() chatNotificationStatusUpdated:EventEmitter<void> = new EventEmitter<void>();
  
  //event emit after selecting user
  // userSelected$ = new EventEmitter<{}>();

  userPresence$!: Observable<boolean>;
  OnlineUsers$!: Observable<number[]>;
  roomId!:string;
  userPresenceOfCurrentUser!:boolean;
  userPresenceOfOtherUserInChat!:boolean;

  isOnline!:boolean;

  ngOnInit(): void {
      // this.OnlineUsers$ = this.store.select(selectUserIds);
      this.hasNetwork(navigator.onLine);

      this.route.params.subscribe( params => {
        if(params['roomId']){
          this.roomId = params['roomId'];
          this.transitToOnSelectUser(this.roomId);
        }
      })
      this.updateNotificationStatus();
      // this.chatNotificationStatusUpdated.emit();
  }

  // isUserOnline(userId:number):boolean{
  //   let onlineUserIds: number[] | undefined=[]  ;
  //   const subscription = this.OnlineUsers$.subscribe((ids:number[] | undefined)=>{
  //     onlineUserIds = ids;
  //   })
  //   const isOnline = onlineUserIds.includes(userId);
  //   subscription.unsubscribe();
  //   return isOnline;
  // }

  updateNotificationStatus():void{
    this.notificationService.updateNotificationStatus();
  }
  
  onSelectUser(user: UserDTO): void {
    this.updateNotificationStatus();

    // this.chatNotificationStatusUpdated.emit();
    console.log("Starts at navigateToChat4Left");

    //emit the user
    // this.userSelected.emit(user);
    //create or get a chatroom
    if(user.id){
      let currentUserId =  this.storgSer.getUserId()
      const userIds:number[]= [currentUserId,user.id];

      console.log("userIds",userIds);
      this.updateUsersPresence(userIds);
      this.chatService.createChatRoom(userIds).subscribe(
        (chatRoom:ChatRoomDTO)=>{
          if (chatRoom.id) {
            
            console.log("chatRoom",chatRoom.id);
            this.userSelected.emit({user,chatRoomId:chatRoom.id});
            this.chatService.joinRoom(chatRoom.id);
            this.chatService.setReadStatusAsTrue(chatRoom.id).subscribe(
              (response:boolean)=>{
                console.log("Chat notification is updated",response);
                this.updateNotificationStatus();

                // this.chatNotificationStatusUpdated.emit();
                console.log("Starts at navigateToChat5Left");

              },(error:any)=>{
                console.error("Failed to update the chat notification",error);
              }
            );
          } else {
            console.error('Error: Chat room ID is missing.');
          }
        },
        (error)=>{
          console.error('Error creating or joining chat room', error);
        }
      )
    }
    // this.userSelected$.emit(event);
  }

  updateUsersPresence(userIds:number[]):void{
    this.chatService.checkUserPresence(userIds[0]).subscribe(
      (response)=>{
        this.userPresenceOfCurrentUser = response;
      }
    )

    this.chatService.checkUserPresence(userIds[1]).subscribe(
      (response)=>{
        this.userPresenceOfOtherUserInChat = response;
      }
    )
    
  }



  @HostListener('window:online',['$event'])
  onOnline(event:Event):void{
    this.hasNetwork(true);
  }

  @HostListener('window:offline',['$event'])
  onOffline(event:Event):void{
    this.hasNetwork(false);
  }


  private hasNetwork(online:boolean):void{
    this.isOnline = online;
  }

  transitToOnSelectUser(roomId:string):void{
    // this.chatNotificationStatusUpdated.emit();

    let currentUserId =  this.storgSer.getUserId()
    let user1:UserDTO;
    this.chatService.getOtherUser(roomId,currentUserId).subscribe(
      (user:UserDTO)=>{
        user1= user;
        this.onSelectUser(user1);
      }
    )
  }

}



import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ChatRoomDTO } from 'src/app/model/message';
import { UserDTO } from 'src/app/model/user';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chat-left-section',
  templateUrl: './chat-left-section.component.html',
  styleUrls: ['./chat-left-section.component.css']
})
export class ChatLeftSectionComponent implements OnInit  {

  @Input() followersList!:UserDTO[];
  @Input() followingList!:UserDTO[];
  constructor(private chatService: ChatService,private storgSer:StorageService, private store:Store) {}
  @Output() userSelected:EventEmitter<{user:UserDTO,chatRoomId:string}> = new EventEmitter();
  
  userPresence$!: Observable<boolean>;
  OnlineUsers$!: Observable<number[]>;

  ngOnInit(): void {
      // this.OnlineUsers$ = this.store.select(selectUserIds);
      
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
  
  onSelectUser(user: UserDTO): void {
    
    //emit the user
    // this.userSelected.emit(user);
    //create or get a chatroom
    if(user.id){
      let currentUserId =  this.storgSer.getUserId()
      const userIds:number[]= [currentUserId,user.id]
      console.log("userIds",userIds);

      this.chatService.createChatRoom(userIds).subscribe(
        (chatRoom:ChatRoomDTO)=>{
          if (chatRoom.id) {
            console.log("chatRoom",chatRoom.id);
            this.userSelected.emit({user,chatRoomId:chatRoom.id});
            this.chatService.joinRoom(chatRoom.id);
          } else {
            console.error('Error: Chat room ID is missing.');
          }
        },
        (error)=>{
          console.error('Error creating or joining chat room', error);
        }
      )
    }
  }

  updateUserPresence(isOnline:boolean):void{
    
  }

}

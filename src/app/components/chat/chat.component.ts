import { Component, Input, OnInit } from '@angular/core';
import { ChatRoomDTO, Message } from 'src/app/model/message';
import { UserDTO } from 'src/app/model/user';
import { ChatService } from 'src/app/services/chat.service';
import { FollowService } from 'src/app/services/follow.service';
import { ChatLeftSectionComponent } from '../chat-left-section/chat-left-section.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  followerListData!:UserDTO[];
  followingListData!:UserDTO[];
  selectedUser!:UserDTO;
  //change the message interface later
  messagesData!:Message[];
  roomId!: string;

  constructor(private followSer:FollowService, private chatSer:ChatService){
   
  }
  ngOnInit(): void {
    this.getFollowerFollowingDetails();
  }

  getFollowerFollowingDetails(){
    this.followSer.getFollowerFollowingDetails().subscribe((response)=>{
      this.followerListData = response.followerList;
      this.followingListData = response.followingList;
    },(error)=>{
      console.log("error fetching follow details",error);
    });
  }

 

  selectUser(event: { user: UserDTO, chatRoomId: string }): void {
    this.selectedUser = event.user;
    this.roomId = event.chatRoomId;

    this.chatSer.getAllMessagesInChatRoom(this.roomId).subscribe(
      (messages:Message[])=>{
        this.messagesData = messages;
      },(error)=>{
        console.error('Error fetching messages', error);
      }
      );
    

    
  }

  onSelectUser(event: { user: UserDTO, chatRoomId: string }): void {
    this.selectedUser = event.user;
    this.roomId = event.chatRoomId;

   
  }

  
  
}

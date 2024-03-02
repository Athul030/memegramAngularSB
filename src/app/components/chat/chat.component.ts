import { Component, Input, OnInit } from '@angular/core';
import { ChatRoomDTO, Message } from 'src/app/model/message';
import { UserDTO } from 'src/app/model/user';
import { ChatService } from 'src/app/services/chat.service';
import { FollowService } from 'src/app/services/follow.service';

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

  constructor(private followSer:FollowService, private chatSer:ChatService){}
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

  // selectUser(user:UserDTO):void{
  //   this.selectedUser = user;
  // }

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
    

    // Optionally, you can join the room here
    // this.chatSer.joinRoom(this.roomId);
  }

  onSelectUser(event: { user: UserDTO, chatRoomId: string }): void {
    this.selectedUser = event.user;
    this.roomId = event.chatRoomId;

    // Optionally, you can join the room here
    // this.chatSer.joinRoom(this.roomId);
  }

  // createChatRoom(userIds:number[]):void{
  //   this.chatSer.createChatRoom(userIds).subscribe(
  //     (chatRoom:ChatRoomDTO)=>{
  //       this.joinRoom(chatRoom.id);
  //     }, (error) => {
  //       console.error('Error creating chat room', error);
  //     }
  //   )
  // }

  // joinRoom(roomId:string):void{
  //   this.chatSer.joinRoom(roomId);
  // }
  
}

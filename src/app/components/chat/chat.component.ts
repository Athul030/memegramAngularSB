import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { UserDTO } from 'src/app/model/user';
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

  constructor(private followSer:FollowService){}
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

  selectUser(user:UserDTO):void{
    this.selectedUser = user;
  }
  
}

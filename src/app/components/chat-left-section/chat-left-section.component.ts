import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDTO } from 'src/app/model/user';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-chat-left-section',
  templateUrl: './chat-left-section.component.html',
  styleUrls: ['./chat-left-section.component.css']
})
export class ChatLeftSectionComponent  {

  @Input() followersList!:UserDTO[];
  @Input() followingList!:UserDTO[];

  @Output() userSelected:EventEmitter<UserDTO> = new EventEmitter();
  

  onSelectUser(user: UserDTO): void {
    this.userSelected.emit(user);
  }
}

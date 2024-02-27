import { Component, Input } from '@angular/core';
import { Message } from 'src/app/model/message';
import { UserDTO } from 'src/app/model/user';

@Component({
  selector: 'app-chat-right-section',
  templateUrl: './chat-right-section.component.html',
  styleUrls: ['./chat-right-section.component.css']
})
export class ChatRightSectionComponent {

  @Input() messages!:Message[];
  @Input() selectedUser!:UserDTO;

  newMessage:string='';
  

  sendMessage(){}
  startCall(){}
  startVideoChat(){}
}

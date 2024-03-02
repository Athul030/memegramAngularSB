// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ChatMessage } from 'src/app/model/message';
// import { ChatService } from 'src/app/services/chat.service';

// @Component({
//   selector: 'app-chat-demo',
//   templateUrl: './chat-demo.component.html',
//   styleUrls: ['./chat-demo.component.css']
// })
// export class ChatDemoComponent   implements OnInit {

//   messageInput:string ='';
//   userId:string="";
//   messageList:any[]=[];

//   constructor(private chatSer:ChatService, private route: ActivatedRoute){

//   }
//   ngOnInit(): void {
//     this.userId = this.route.snapshot.params["userId"];
//     this.chatSer.joinRoom("ABC");
//     this.lisenerMessage();
//   }

//   sendMessage(){
//     const chatMessage: ChatMessage=({
//       messageId: 1234,  // Provide a unique ID
//       text: this.messageInput,
//       from: this.userId
//     });
  
//     this.chatSer.sendMessage("ABC", chatMessage.text, chatMessage.from);
//     this.messageInput = '';
//   }

//   lisenerMessage(){
//     this.chatSer.getMessageSubject().subscribe((messages:any)=>{
//       this.messageList = messages.map((item:any)=>({
//         ...item,
//         message_side:item.user === this.userId ? 'sender':'reciever'
//       }))
//     })
//   }

// }

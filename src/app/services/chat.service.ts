import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Observable, async } from 'rxjs';
import { ChatRoomDTO, Message, MessageType, OtherUserRequest } from '../model/message';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationType, NotificationsDTO } from '../model/notification';
import { User, UserDTO } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseURL:string = "http://localhost:8080";

  private stompClient: any
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http:HttpClient) { 
    this.initConnenctionSocket();
  }
  initConnenctionSocket() {
    const url = 'ws://localhost:8080/socket';
    this.stompClient = Stomp.client(url);
  }
  joinRoom(roomId: string) {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessages = this.messageSubject.getValue();

        const updatedMessages=[...currentMessages,messageContent];
        this.messageSubject.next(updatedMessages);
        
      })
    })
  }

  joinVideoCall() {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/video/`, (videoMessages: any) => {
        const videoContent = JSON.parse(videoMessages.body);
        
      });
    });
  }
  

  sendMessage(roomId: string, content: string , senderId:number,imageName:string) {
    if(!this.stompClient.connected){
      console.error('WebSocket connection not established. Please reconnect');
      return;
    }
    console.log("inside send message in chat service");
    let chatMessage:Message;
    if(imageName==null || imageName === ''){
      chatMessage = {
        chatId: roomId,
        senderId: senderId,
        messageType: MessageType.TEXT,
        content: content
  
      }
    }else{
      console.log("inside send message in chat service IN ELSE");

      chatMessage = {
        chatId: roomId,
        senderId: senderId,
        messageType: MessageType.IMAGE,
        content: content,
        imageName:imageName
  
      }
    }

    let notificationsDTO:NotificationsDTO;
    notificationsDTO={
      notificationType:NotificationType.MESSAGE,
      notificationFrom: senderId,
      read:false,
      chatRoomId: roomId
    }
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
    
    this.stompClient.send(`/app/notifications`,{}, JSON.stringify(notificationsDTO));

  }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }

  createChatRoom(userIds:number[]):Observable<ChatRoomDTO>{
    const url = this.baseURL+'/createChatRoom';
    const requestBody = {participantUserIds:userIds}
    return this.http.post<ChatRoomDTO>(url,requestBody);
  }

  getAllMessagesInChatRoom(roomId:string):Observable<Message[]>{
    const url = this.baseURL+'/chat/history';
    const params = {id:roomId};
    const options = {params};
    return this.http.get<Message[]>(url,options);
  }

  private getCurrentDate():string{
    const currentDate = new Date();
    const options :  Intl.DateTimeFormatOptions = {
      month:'short',
      day:"2-digit",
      hour:"numeric",
      minute:"2-digit",
      hour12:true

    };
    const formattedDate = currentDate.toLocaleString('en-US',options);
    return formattedDate;
  }
  

  uploadImageInChat(file:File):Observable<HttpResponse<{fileUrl: string}>>{
    
    const url = `${this.baseURL}/files/chat`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<{fileUrl: string}>(url, formData,  { observe: 'response' });
    }

    updateUserPresence(userId:number,status:boolean):Observable<void>{
      const url=`${this.baseURL}/userPresence/${userId}/${status}`;
      return this.http.post<void>(url,{});

    }
    checkUserPresence(userId:number):Observable<boolean>{
      const url=`${this.baseURL}/api/user/userPresenceCheck/${userId}`;
      return this.http.get<boolean>(url);

    }

    getOtherUser(roomIds:string,currentUserIds:number):Observable<UserDTO>{
      const otherUserRequest :OtherUserRequest={
        roomId:roomIds,
        currentUserId:currentUserIds
      }
      return this.http.post<UserDTO>(`${this.baseURL}/chat/getTheOtherUser`,otherUserRequest);
    }

    
}





export interface ChatMessage{
    messageId:number,
    text:string,
    from:string
}

export interface Message{
    id?:string
    chatId?:string;
    senderId:number;
    messageType:MessageType;
    content?:string;
    time?:Date;
    isRead?:boolean;
    imageName?:string;

}


export enum MessageType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE'
  }

export interface ChatRoomDTO{
    id:string;
    participantUserIds:number[];
    messages:Message[];
    lastMessageId:string;
}



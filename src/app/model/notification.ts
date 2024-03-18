export interface NotificationsDTO{
    notificationId?:number,
    count?:number,
    notTimeStamp?:string,
    notTimeStampFromFrontEnd?:string,
    notificationType:NotificationType,
    notificationFrom: number,
    notificationTo?:number,
    read:boolean
    chatRoomId?:string

    notificationFromUserId?:number;
    notificationFromEmail?:string;
    notificationFromFullName?:string;
    notificationToUserId?:number;
    notificationToEmail?:string;
    notificationToFullName?:string;
    
}


export enum NotificationType{
    MESSAGE = 'MESSAGE',
    AUDIOCALL = 'AUDIOCALL',
    VIDEOCALL = 'VIDEOCALL'
}
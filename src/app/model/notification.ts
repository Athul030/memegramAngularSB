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
    
}


export enum NotificationType{
    MESSAGE = 'MESSAGE',
    AUDIOCALL = 'AUDIOCALL',
    VIDEOCALL = 'VIDEOCALL'
}
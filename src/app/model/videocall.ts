import { environment } from "../environments/environment";

export class VideoCall{
    micIcon:boolean = true;
    muteIcon:boolean = false;
    micBtn:boolean = true;
    videoBtn:boolean = true;
    videoIcon:boolean = true;
    videooffIcon:boolean = false

    rtc:any= {
        localAudioTrack: null,
        localVideoTrack: null,
        client: null
      
    };
    
    options: any ={
        appId: environment.appId,
        channel: environment.channel,
        token: environment.token,
        uid: null
    };
}

export interface SignalDataDTO {
    usersId: string;
    type: SignalType;
    data: string;
    toUid: string;
}

export enum SignalType{
    Login = 'Login',
    UserId = 'UserId',
    offer = 'offer',
    answer = 'answer',
    Ice = 'Ice',
    NewMember = 'NewMember',
    SDP = 'SDP',
    CANDIDATE = 'CANDIDATE'
}



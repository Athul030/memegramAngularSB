import { ElementRef, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Videocall2Service {

  configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  connection?:RTCPeerConnection;

  constructor(private socket:Socket) { }

  //signaling service methods
  getMessages():Observable<any>{
    return this.socket.fromEvent('message');
  }

  sendMessage(payload: any):void{
    this.socket.emit('send-message',payload);
  }

  //call service methods

  private async _initConnection(remoteVideo:ElementRef):Promise<void>{
    this.connection = new RTCPeerConnection(this.configuration);
    await this._getStreams(remoteVideo);
    this._registerConnectionListeners();
  }

  public async makeCall(remoteVideo:ElementRef):Promise<void>{
    await this._initConnection(remoteVideo);
    const offer = await this.connection?.createOffer();
    await this.connection?.setLocalDescription(offer);
    this.sendMessage({type:'offer',offer});
  }

  public async handlerOffer(
    offer:RTCSessionDescription,
    remoteVideo:ElementRef
  ):Promise<void>{
    await this._initConnection(remoteVideo);
    await this.connection?.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await this.connection?.createAnswer();
    await this.connection?.setLocalDescription(answer);
    this.sendMessage({type:'answer',answer});
  }

  public async handleAnswer(answer:RTCSessionDescription):Promise<void>{
    await this.connection?.setRemoteDescription(new RTCSessionDescription(answer));
  }

  public async handleCandidate(candidate:RTCIceCandidate):Promise<void>{
    if(candidate){
      await this.connection?.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  private _registerConnectionListeners():void{
    if(this.connection !== undefined){
      this.connection.onicegatheringstatechange = (ev:Event) =>{
        console.log(`Ice gathering state changed: ${this.connection?.iceGatheringState}`);
      };

      this.connection.onconnectionstatechange = () =>{
        if(this.connection !== undefined){
        console.log(
          `Connection state change: ${this.connection.connectionState}`
        );
        }
      }

      this.connection.onsignalingstatechange = () => {
        if(this.connection !== undefined){
        console.log(`Signaling state change: ${this.connection.signalingState}`);
      }
      };
  
      this.connection.oniceconnectionstatechange = () => {
        if(this.connection !== undefined){
        console.log(
          `ICE connection state change: ${this.connection.iceConnectionState}`
        );
        }
      };

      this.connection.onicecandidate = (event) =>{
        if(event.candidate){
          const payload = {
            type:'candidate',
            candidate:event.candidate.toJSON()
          }
          this.sendMessage(payload);
        }
      }

    }
  }

  private async _getStreams(remoteVideo:ElementRef):Promise<void>{
    const stream = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    })

    const remoteStream = new MediaStream();
    remoteVideo.nativeElement.srcObject = remoteStream;

    if(this.connection)
    this.connection.ontrack = (event)=>{
      event.streams[0].getTracks().forEach((track)=>{
        remoteStream.addTrack(track);
      })
    }

    stream.getTracks().forEach((track)=>{
      this.connection?.addTrack(track,stream);
    })
  }



}

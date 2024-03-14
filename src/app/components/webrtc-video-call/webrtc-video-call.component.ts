import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomDTO } from 'src/app/model/message';
import { SignalDataDTO, SignalType } from 'src/app/model/videocall';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/storage.service';
import { VideocallService } from 'src/app/services/videocall.service';





@Component({
  selector: 'app-webrtc-video-call',
  templateUrl: './webrtc-video-call.component.html',
  styleUrls: ['./webrtc-video-call.component.css']
})
export class WebrtcVideoCallComponent implements OnInit{

  otherUserId!:number;
  currentUserId =  this.storgSer.getUserId();

  @Input() userIdFromChat!:number;
  @ViewChild('video1',{static:true}) video1!:ElementRef<HTMLVideoElement>
  @ViewChild('video2',{static:true}) video2!:ElementRef<HTMLVideoElement>

  code:any;
  peerConnection:any;
  signaling:any;
  senders:any=[];
  userMediaStream:any;
  displayMediaStream:any;
  disabled:boolean=true;
  codeInput!:string;
  connected:boolean = false; 
  sessionId:any;
  

  constructor(private storgSer:StorageService, private route:ActivatedRoute, private chatSer:ChatService, private videoSer:VideocallService, private router:Router, private videoCallSer:VideocallService){}

  ngOnInit(): void {
    console.log('inside ngoninit');
    
    this.videoCallSer.userIdForWebRTC$.subscribe(userId=>{
      this.otherUserId = userId;

    })
    console.log("the other user id is",this.otherUserId);
    

    document.getElementById('start-button')?.addEventListener('click',async event=>{
      this.startChat();
      this.connected = true;
    })
    
    this.signaling = new WebSocket('ws://localhost:8080/socket1');
    this.signaling.onopen = () => {
      console.log('WebSocket connection opened.');
      console.log('signaling',this.signaling);

    };

    this.signaling.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };
  this.signaling.onclose = (event: { code: any; reason: any; }) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
  };    

  }

  

  async startChat(){
    console.log("inside startChat")
    this.userMediaStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    this.showChatRoom();
    this.peerConnection = this.createPeerConnection();

    //the login and new memeber message
    const loginMessage: SignalDataDTO = {
      usersId: '',
      type: SignalType.Login,
      data: '',
      toUid:''
    };
    this.sendMessage(loginMessage);

    

    // const newMemberMessage: SignalDataDTO = {
    //   usersId: this.currentUserId.toString(),
    //   type: SignalType.NewMember,
    //   data: '', 
    //   toUid: this.otherUserId.toString()
    // };
    // this.sendMessage(newMemberMessage);

    this.addMessageHandler();
    this.userMediaStream.getTracks().forEach((track: any)=>this.senders.push(this.peerConnection.addTrack(track,this.userMediaStream)));
    this.video1.nativeElement.srcObject = this.userMediaStream;

    

  }

  showChatRoom(){
    document.getElementById('start')!.style.display = 'none';
    document.getElementById('chat-room')!.style.display = 'flex';
  }
  
  createPeerConnection(){
    console.log('Inside createPeerConnection');
    const pc = new RTCPeerConnection({
      iceServers : [{ urls: 'stun:stun.l.google.com:19302'}]

    })

    pc.onnegotiationneeded = async () =>{
      await this.createAndSendOffer();
    };

    pc.onicecandidate = (iceEvent)=>{
      if(iceEvent && iceEvent.candidate){
        this.sendMessage({
          usersId: this.currentUserId.toString(),
          type: SignalType.Ice,
          data: JSON.stringify(iceEvent.candidate),
          toUid: this.otherUserId.toString()
        })
      }
    }

    pc.ontrack = (event) =>{
      const _video2 = this.video2.nativeElement;
      _video2.srcObject = event.streams[0];
    }

    return pc;
  }

  addMessageHandler(){
    console.log('Inside addMessageHandler');

    this.signaling.onmessage = async (message: { data: string; }) =>{
      const data = JSON.parse(message.data);
      if(!data){
        return;
      }
      console.log(data ,'data is this');

      let {type, data: content} = data;
      if(type === SignalType.Ice && content){
        await this.peerConnection.addIceCandidate(content);
      }else if(type === SignalType.offer){
        if(content.type === 'offer'){
          await this.peerConnection.setRemoteDescription(content);
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);

          this.sendMessage({
            usersId: this.currentUserId.toString(),
            type: SignalType.offer,
            data: JSON.stringify(answer),
            toUid: this.otherUserId.toString()
          });
        }
        else if(content.type === 'answer'){
          await this.peerConnection.setRemoteDescription(content);
          console.log('Offer accepted!');
        }else{
          console.log('unsupported SDP type')
        }
      }else if(type === SignalType.UserId) { 
        this.sessionId = content;
        console.log('Received sessionId:', this.sessionId);
        
        
      }
    }
  }

  joinSession(sessionId: string) {
    console.log('Joining session with ID:', this.sessionId);
    
    const webSocketUrl = 'ws://localhost:8080/' + this.sessionId;
    this.signaling = new WebSocket(webSocketUrl);
  
    this.signaling.onopen = () => {
      console.log('WebSocket connection opened for session:', this.sessionId);
    };
  
    this.signaling.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };
  
    this.signaling.onclose = (event: { code: any; reason: any }) => {
      console.log('WebSocket connection closed for session:', this.sessionId, 'with code:', event.code, 'and reason:', event.reason);
    };
  
    this.signaling.onmessage = (message: { data: string }) => {
      console.log('Received message from session:', this.sessionId, 'data:', message.data);
    };

    this.startChat();
  }
  

    async createAndSendOffer(){
      const offer  = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      this.sendMessage({
        usersId: this.currentUserId.toString(),
        type: SignalType.offer,
        data: JSON.stringify(offer),
        toUid: this.otherUserId.toString()
      })
    }
  


  sendMessage( message: SignalDataDTO ){
    this.signaling.send(JSON.stringify(message))
  }

  async endCall(){
    this.userMediaStream.getTracks().forEach( (track: { stop: () => void; }) => {
      track.stop();
    });
    this.video1.nativeElement.srcObject = null;
    this.video2.nativeElement.srcObject = null;
  }


 
  joinCall() {
    console.log("Joining Video Call");
    this.joinSession(this.sessionId)
  }
}
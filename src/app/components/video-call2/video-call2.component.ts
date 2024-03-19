import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Videocall2Service } from 'src/app/services/videocall2.service';

@Component({
  selector: 'app-video-call2',
  templateUrl: './video-call2.component.html',
  styleUrls: ['./video-call2.component.css']
})
export class VideoCall2Component implements OnInit {

  @ViewChild('remoteVideo') remoteVideo!:ElementRef;
  
  constructor(private route:ActivatedRoute,private signalingService:Videocall2Service){}

  userId!:number;
  otherUserId!:number;

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if (params['userId'] && params['otherUserId']) {
        this.userId = params['userId'];
        this.otherUserId = params['otherUserId'];  
        console.error("Data in params",this.userId,this.otherUserId)

      }else{
        console.error("Error, no datas in params")
      }
    })

    this.signalingService.getMessages().subscribe((payload)=>this._handleMessage(payload));
  }

  public async makeCall():Promise<void>{
    await this.signalingService.makeCall(this.remoteVideo);
  }

  private async _handleMessage(data:any):Promise<void>{
    switch(data.type){
      case 'offer':
        await this.signalingService.handlerOffer(data.offer,this.remoteVideo);
        break;

      case 'answer':
        await this.signalingService.handleAnswer(data.answer);
        break;
      
      case 'candidate':
        await this.signalingService.handleCandidate(data.candidate);
        break;

      default:
        break;
    }
  }


}

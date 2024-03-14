import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { MessageType } from '../model/message';
import { ActivatedRoute } from '@angular/router';
import { track } from 'logrocket';
import { DialogConfig } from '@angular/cdk/dialog';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VideocallService {

  baseURL:string = "http://localhost:8080";

  private userIdForWebRTCSource = new BehaviorSubject<number>(0);
  userIdForWebRTC$ = this.userIdForWebRTCSource.asObservable();

  constructor(private http:HttpClient,private route:ActivatedRoute,
    ) { 
    
  }

  setUserIdForWebRTC(userId:number):void{
    this.userIdForWebRTCSource.next(userId);
  }

  ngOnInit(){
    
  }

  

  

  
  



}

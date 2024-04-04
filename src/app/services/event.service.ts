import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private followerRemovedSubject = new Subject<void>();


  followerRemoved$ = this.followerRemovedSubject.asObservable();

  emitFollowerRemoved():void{
    this.followerRemovedSubject.next();
  }

 

  //custom for follower added
  private followerAddedSubject = new Subject<void>();

  followerAdded$ = this.followerAddedSubject.asObservable();

  emitFollowerAdded():void{
    this.followerAddedSubject.next();
  }

  //for post removed
  private postRemovedSubject = new Subject<void>();
  postRemoved$ = this.postRemovedSubject.asObservable();

  emitPostRemoved():void{
    this.postRemovedSubject.next();
  }

}

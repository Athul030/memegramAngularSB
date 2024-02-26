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
}

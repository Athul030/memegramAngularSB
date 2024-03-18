import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { NotificationsDTO } from '../model/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {


  constructor(private http:HttpClient, private storage:StorageService) { }

  baseURL:string = "http://localhost:8080";


  public getMessageNotificationsDetails(userId:number):Observable<NotificationsDTO[]>{
    return this.http.get<NotificationsDTO[]>(`${this.baseURL}/messageNotify/${userId}`);
  }

}

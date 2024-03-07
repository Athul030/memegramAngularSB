import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/service/admin.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ChangeProfilePicComponent } from '../change-profile-pic/change-profile-pic.component';
import { Observable } from 'rxjs';
import { DpState } from 'src/app/store/store.reducer';
import {  Store, select } from '@ngrx/store';
import { selectImageUrl } from 'src/app/store/store.selectors';
// import { removeUserFromPresence } from 'src/app/store/store.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  imageUrl:Observable<string | null>;

  constructor(private adSservice:AdminService,private usService:UserService,
    private dialog:MatDialog, private store:Store<DpState>){
    this.imageUrl = store.pipe(select(selectImageUrl));
    
  }
  currentUser!:User ;

  ngOnInit(): void {
    this.usService.getCurrentUser().subscribe(
      (response)=>{
        this.currentUser = response;
        console.log("profilepic",this.currentUser.profilePicUrl )
        this.currentUser.profilePicUrl = response.profilePicUrl;
      },(error)=>{
        console.log("unable to access the current user", error);
      }
    )
  }

  logout():void{
    console.log("logout clicked");
    // if(this.currentUser.id !== undefined){
    //   this.store.dispatch(removeUserFromPresence({userId:this.currentUser.id}));
    // }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    this.adSservice.logout().subscribe(
      (respones)=>{
        console.log("respone"+respones);
      },(error) => {
        console.error('Logout failed', error);
        // handle logout failure 
      }
    )
  }

  

  onChangeProfilePicClick(){
    this.dialog.open(ChangeProfilePicComponent);
  }



}

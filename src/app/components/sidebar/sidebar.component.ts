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
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { resetProfilePicture } from 'src/app/store/store.actions';
// import { removeUserFromPresence } from 'src/app/store/store.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  imageUrl:Observable<string | null>;

  constructor(private adSservice:AdminService,private usService:UserService, private strgService:StorageService,
    private dialog:MatDialog, private store:Store<DpState>,private router:Router){
    this.imageUrl = store.pipe(select(selectImageUrl));
    
  }
  currentUser!:User ;

  ngOnInit(): void {
    this.getCurrentUserDetails();
  }

  getCurrentUserDetails(){
    this.usService.getCurrentUser().subscribe(
      (response)=>{
        this.currentUser = response;
        console.log("profilepic",this.currentUser.profilePicUrl )
        console.log("profilepic",response.profilePicUrl )

        this.currentUser.profilePicUrl = response.profilePicUrl;
      },(error)=>{
        console.log("unable to access the current user", error);
      }
    )
  }

  logout():void{
    window.location.reload()
    console.log("logout clicked");
    this.store.dispatch(resetProfilePicture())

    this.adSservice.removePresence(this.strgService.getUserId());
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    this.store.dispatch(resetProfilePicture())

    this.adSservice.logout().subscribe(
      (respones)=>{
        this.router.navigate(['login'])
        console.log("respone"+respones);
      },(error) => {
        console.error('Logout failed', error);
        // handle logout failure 
      }
    )
  }

  

  onChangeProfilePicClick(){
    this.dialog.open(ChangeProfilePicComponent).afterClosed().subscribe(
      ()=>{
        this.getCurrentUserDetails();
      }
    );
  }



}

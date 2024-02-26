import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FollowRequestBody } from 'src/app/model/followDetails';
import { UserDTO } from 'src/app/model/user';
import { EventService } from 'src/app/services/event.service';
import { FollowService } from 'src/app/services/follow.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.component.html',
  styleUrls: ['./profile-following.component.css']
})
export class ProfileFollowingComponent implements OnInit {
  allFollowingList!:UserDTO[];

  constructor(private followSer:FollowService, private storageSer:StorageService,private matSnack:MatSnackBar,
    private eventService:EventService){}

    ngOnInit(): void {
      this.getFollowerDetails();
    }
  
    getFollowerDetails(){
      return this.followSer.getFollowerFollowingDetails().subscribe(
        response=>{
          this.allFollowingList = response.followingList;
        },(error)=>{
          console.log("Unable to get follower list",error);
        }
      )
    }

    removeFollow(id:number|undefined){
      if (id === undefined) {
        console.log("Follower ID is undefined");
        return;
      }
      const userId = this.storageSer.getUserId();
      const followRequestBody:FollowRequestBody={
        
        followerId: userId,
        followingId : id
      }
      this.followSer.unfollow(followRequestBody).subscribe(
        response =>{
          if(response === true){
            this.matSnack.open(
              'Unfollowed Successfully','Ok',{
                duration:3000,
                panelClass: 'custom-snack-bar-container'
              }
            )
            this.getFollowerDetails();
            this.eventService.emitFollowerRemoved();
          }
        },error=>{
          this.matSnack.open(
            'Follower not removed','Ok',{
              duration:3000,
              panelClass: 'custom-snack-bar-container'
            }
          )
          console.log("Unfollowing is unsuccessful",error);
        }
      )
    }
  

}

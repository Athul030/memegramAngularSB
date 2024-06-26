import { Component, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FollowRequestBody, FollowerFollowingCount } from 'src/app/model/followDetails';
import { UserDTO } from 'src/app/model/user';
import { EventService } from 'src/app/services/event.service';
import { FollowService } from 'src/app/services/follow.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile-followers',
  templateUrl: './profile-followers.component.html',
  styleUrls: ['./profile-followers.component.css']
})
export class ProfileFollowersComponent implements OnInit {

  allFollowerList:UserDTO[]=[];
  currentPage:number = 1;
  itemsPerPage:number = 5;

  constructor(private followSer:FollowService, private storageSer:StorageService,private matSnack:MatSnackBar,
    private eventService:EventService, private router:Router){

  }
  ngOnInit(): void {
    
    this.getFollowerDetails();
  }

  

  getFollowerDetails(){
    return this.followSer.getFollowerFollowingDetails().subscribe(
      response=>{
        this.allFollowerList = response.followerList;
      },(error)=>{
        console.log("Unable to get follower list",error);
      }
    )
  }

  removeFollower(id:number|undefined){
    if (id === undefined) {
      console.log("Follower ID is undefined");
      return;
    }
    const userId = this.storageSer.getUserId();
    const followRequestBody:FollowRequestBody={
      
      followerId: id,
      followingId : userId
    }
    this.followSer.removeFollower(followRequestBody).subscribe(
      response =>{
        if(response === true){
          this.matSnack.open(
            'Removed follower Successfully','Ok',{
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
        console.log("follower not removed",error);
      }
    )
  }

  navigateToUserProfile(userId:number):void{
    this.router.navigate(['/profile',userId]);
  }

  getCurrentPageFollowers(){
    const startIndex = (this.currentPage-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(startIndex,endIndex,this.allFollowerList.slice(startIndex,endIndex));
    
    return this.allFollowerList.slice(startIndex,endIndex);
  }

  nextPage(){
    this.currentPage++;
  }

  previousPage() {
    this.currentPage --;
  }

}

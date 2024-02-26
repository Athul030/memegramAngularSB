import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/service/admin.service';
import { FollowRequestBody } from 'src/app/model/followDetails';
import { UserDTO } from 'src/app/model/user';
import { FollowService } from 'src/app/services/follow.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css']
})
export class RightSideBarComponent {

  userList:UserDTO[]=[];
  displayedSuggestions: UserDTO[] = [];
  suggestionsToShow = 5;
  currentIndex = 0;


  constructor(private service:AdminService, private storageSer:StorageService, private followSer:FollowService, private matSnack: MatSnackBar){}
  currentUserId = this.storageSer.getUserId();
  ngOnInit(): void {
    this.fetchUsers();
  }

  getButtonText(user: UserDTO): string {
    return user.followers.some(follower => follower.id === this.currentUserId) ? 'Unfollow' : 'Follow';
  }

  loadMoreSuggestions() {
    const totalSuggestions = this.userList.length;
    
    if (totalSuggestions > 0) {
      const endIndex = this.currentIndex + this.suggestionsToShow;
      this.displayedSuggestions = this.userList.slice(this.currentIndex, endIndex)
                      .filter(user => user.id !== this.currentUserId);

      this.currentIndex += this.suggestionsToShow;

      if (this.currentIndex >= totalSuggestions) {
        this.currentIndex = 0;
      }
    }
  }
  fetchUsers(){
    this.service.getAllUsersForDashboard().subscribe(users => {
      this.userList = users;
      console.log(users)
      this.loadMoreSuggestions(); 
    });
  }

  toggleFollow(user:UserDTO):void{
    if(user.following){
      this.unfollow(user.id)
    }else{
      this.follow(user.id);
    }
  }

  follow(id:number | undefined){
    if (id === undefined) {
      console.log("Follower ID is undefined");
      return;
    }
    const userId = this.storageSer.getUserId();
    const followRequestBody:FollowRequestBody={
      
      followerId: userId,
      followingId : id
    }
    this.followSer.follow(followRequestBody).subscribe(
      response =>{
        if(response === true){
          this.matSnack.open(
            'Followed Successfully','Ok',{
              duration:3000,
              panelClass: 'custom-snack-bar-container'
            }
          )
          
          
        }
      },error=>{
        this.matSnack.open(
          'Follower not added sue to error','Ok',{
            duration:3000,
            panelClass: 'custom-snack-bar-container'
          }
        )
        console.log("Following is unsuccessful",error);
      }
    )
  }
  
  unfollow(id:number | undefined){
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
          
          
        }
      },error=>{
        this.matSnack.open(
          'Follower not removed due to error','Ok',{
            duration:3000,
            panelClass: 'custom-snack-bar-container'
          }
        )
        console.log("Unfollowing is unsuccessful",error);
      }
    )
  }


}




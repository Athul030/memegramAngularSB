import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FollowRequestBody } from 'src/app/model/followDetails';
import { PostDTO, User, UserBlockRequest, UserDTO } from 'src/app/model/user';
import { EventService } from 'src/app/services/event.service';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ProfilePostsComponent } from '../profile-posts/profile-posts.component';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {

  currentComponent:string = 'posts';
  currentUser!:UserDTO;
  otherUser!:UserDTO;
  otherUserPosts!:PostDTO[];

  totalnumberOfPosts!:number ;
  totalnumberOfFollowers!:number ;
  totalnumberOfFollowing!:number ; 
  otherTotalnumberOfPosts!:number ;
  otherTotalnumberOfFollowers!:number ;
  otherTotalnumberOfFollowing!:number ;  
  followingAlready!:boolean;
  blockedAlready!:boolean;

  @Input() isOwnProfileValue!:boolean;
  @Input() otherUserIdValue!:number;
  isOwnProfileValueValue!:boolean;

  @ViewChild(ProfilePostsComponent) profilePostsComponent?: ProfilePostsComponent;
  
  constructor(private postSer:PostService, private followSer:FollowService, private userSer:UserService, private eventService:EventService, private storageSer:StorageService, private matSnack:MatSnackBar){
    this.showPosts();
    this.eventService.followerRemoved$.subscribe(()=>{
      this.getCountOfPostAndFollowers();
    });
  }
  ngOnInit(): void {
    this.isOwnProfileValueValue  = this.isOwnProfileValue;

    this.getUserDetails();
    this.getCountOfPostAndFollowers();
    if(!this.isOwnProfileValue){
      this.otherUserDetails(this.otherUserIdValue);
      this.otherUsergetCountOfPostAndFollowers(this.otherUserIdValue);
      this.otherUserPostsList(this.otherUserIdValue);
      
    }
  }

  private otherUserPostsList(userId:number):void{
    this.postSer.getPostsByOtherUser(userId).subscribe(
      (response)=>{
        this.otherUserPosts = response;
      },(error)=>{
        console.error('Error fetching user details')
      }
    )
  }

  private notifyProfilePostsComponent():void{
    if(this.profilePostsComponent){
      this.profilePostsComponent.otherUserPostsInput = this.otherUserPosts;
      this.profilePostsComponent.isOwnProfileValues=this.isOwnProfileValueValue;
    }
  }

 


  handleClick(component: string) {
    this.currentComponent = component;
  }

  showPosts() {
    this.handleClick('posts');
  }

  getUserDetails(){
    this.userSer.getCurrentUser().subscribe(
      (response)=>{
        this.currentUser = response;

      },(error)=>{
        console.error('Error fetching user details')
      }
    )
  }

  

  otherUserDetails(userId:number){
    this.userSer.getOtherUser(userId).subscribe(
      (response)=>{
        this.otherUser = response;
        this.checkFollowingAlready();
        this.checkBlockedAlready();
      },(error)=>{
        console.error('Error fetching user details')
      }
    )
  }

  getCountOfPostAndFollowers(){
    this.postSer.getPostCount().subscribe(
      (response)=>{
        this.totalnumberOfPosts = response;
      },(error)=>{
        console.error('Error fetching post count:', error);
      }
    );

    this.followSer.getFollowerFollowingCount().subscribe(
      (response)=>{
        this.totalnumberOfFollowers = response.followerNumber;
        this.totalnumberOfFollowing = response.followingNumber;
      },(error)=>{
        console.error('Error fetching follower and following details')
      }
    )
  }

  otherUsergetCountOfPostAndFollowers(userId:number){
    this.postSer.getPostCountForOtherUser(userId).subscribe(
      (response)=>{
        this.otherTotalnumberOfPosts = response;
      },(error)=>{
        console.error('Error fetching post count:', error);
      }
    );

    this.followSer.getFollowerFollowingCountOfOtherUser(userId).subscribe(
      (response)=>{
        this.otherTotalnumberOfFollowers = response.followerNumber;
        this.otherTotalnumberOfFollowing = response.followingNumber;
      },(error)=>{
        console.error('Error fetching follower and following details')
      }
    )
  }



  toggleFollow(otherUserId:number){
    if(this.followingAlready){
      this.unfollow(otherUserId);
    }else{
      this.follow(otherUserId);
    }
  }

  toggleBlock(otherUserId:number){
    if(this.blockedAlready){
      this.unblock(otherUserId);
    }else{
      this.block(otherUserId);
    }
  }

  block(id:number):void{
    if (id === undefined || this.currentUser.id === undefined) {
      console.log("Either blockingUserId or blockedUserId is undefined");
      return;
    }
    //check nowwwwwww
    const userblockRequest:UserBlockRequest={
      blockingUserId: this.currentUser.id,
      blockedUserId : id
    }
    this.userSer.blockUser(userblockRequest).subscribe(
      (response)=>{
        this.blockedAlready = true;
        this.matSnack.open(
          'Blocked Successfully', 'Ok', {
          duration: 3000,
          panelClass: 'custom-snack-bar-container'
        });
      },error=>{
        this.matSnack.open(
          'Follower not added due to error', 'Ok', {
          duration: 3000,
          panelClass: 'custom-snack-bar-container'
        });
        console.log("Blocking is unsuccessful", error);
      }
    )

  }

  unblock(id:number):void{
    if (id === undefined || this.currentUser.id === undefined) {
      console.log("Either blockingUserId or blockedUserId is undefined");
      return;
    }

    const userblockRequest:UserBlockRequest={
      blockingUserId: this.currentUser.id,
      blockedUserId : id
    }
    this.userSer.unBlockUser(userblockRequest).subscribe(
      (response)=>{
        this.blockedAlready = false;
        this.matSnack.open(
          'Unblocked Successfully', 'Ok', {
          duration: 3000,
          panelClass: 'custom-snack-bar-container'
        });
      },error=>{
        this.matSnack.open(
          'Unblocking unsuccessful due to error', 'Ok', {
          duration: 3000,
          panelClass: 'custom-snack-bar-container'
        });
        console.log("Unblocking is unsuccessful", error);
      }
    )
  }

  follow(id:number):void {
      if (id === undefined) {
        console.log("Follower ID is undefined");
        return;
      }
      const userId = this.storageSer.getUserId();
      const followRequestBody: FollowRequestBody = {
        followerId: userId,
        followingId: id
      };

      this.followSer.follow(followRequestBody).subscribe(
        response => {
          if (response === true) {
            this.followingAlready=true;
            this.updateFollowerCount(1);
            this.matSnack.open(
              'Followed Successfully', 'Ok', {
              duration: 3000,
              panelClass: 'custom-snack-bar-container'
            });
          }
        },
        error => {
          this.matSnack.open(
            'Follower not added due to error', 'Ok', {
            duration: 3000,
            panelClass: 'custom-snack-bar-container'
          });
          console.log("Following is unsuccessful", error);
        }
      );

  }

  unfollow(id:number):void  {
    if (id === undefined) {
      console.log("Follower ID is undefined");
      return;
    }
    const userId = this.storageSer.getUserId();
    const followRequestBody: FollowRequestBody = {
      followerId: userId,
      followingId: id
    };

    this.followSer.unfollow(followRequestBody).subscribe(
      response => {
        if (response === true) {
          this.followingAlready=false;
          this.updateFollowerCount(-1);
          this.matSnack.open(
            'Unfollowed Successfully', 'Ok', {
            duration: 3000,
            panelClass: 'custom-snack-bar-container'
          });
        }
      },
      error => {
        this.matSnack.open(
          'Follower not removed due to error', 'Ok', {
          duration: 3000,
          panelClass: 'custom-snack-bar-container'
        });
        console.log("Unfollowing is unsuccessful", error);
      }
    );
  }
  
  checkFollowingAlready(){
    if(this.otherUser && this.otherUser.followers.some(x=>x.id===this.currentUser.id)){
      this.followingAlready=true;
    }else{
      this.followingAlready=false;
    }
  }

  checkBlockedAlready(){
    if(this.otherUser && this.currentUser && this.currentUser.blockedUsers.some(x=>x.id===this.otherUser.id)){
      this.blockedAlready=true;
    }else{
      this.blockedAlready=false;
    }
  }

  updateFollowerCount(change: number): void {
    this.totalnumberOfFollowers += change;
  }
}

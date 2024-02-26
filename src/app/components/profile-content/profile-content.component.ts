import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { EventService } from 'src/app/services/event.service';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {

  currentComponent:string = 'posts';
  currentUser!:User;
  totalnumberOfPosts!:number ;
  totalnumberOfFollowers!:number ;
  totalnumberOfFollowing!:number ;

  constructor(private postSer:PostService, private followSer:FollowService, private userSer:UserService, private eventService:EventService){
    this.showPosts();
    this.eventService.followerRemoved$.subscribe(()=>{
      this.getCountOfPostAndFollowers();
    });
  }
  ngOnInit(): void {
    this.getUserDetails();
    this.getCountOfPostAndFollowers();
    
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

  
}

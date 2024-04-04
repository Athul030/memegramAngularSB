import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';
import { Post, UserDTO } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feedPosts:Post[]=[];
  constructor(private dialog:MatDialog,private service:UserService, private strgSer:StorageService, private followSer:FollowService){}
  currentUser!:UserDTO;
  ngOnInit(): void {

    this.getCurrentUser();
    this.followSer.getFollowSubject().subscribe((followed:boolean)=>{
      if(followed  ){
        this.getCurrentUser();
        this.getPosts();
      }
    });
    
    
  }

  getCurrentUser(){
    this.service.getCurrentUser().subscribe(
      (user: UserDTO) => {
        this.currentUser = user;
        this.getPosts();
      },
      (error) => {
        console.error("ngOnInit in Feeds comp",error);
      }
    );
    
  }

  onCreatePostClick(){
    const dialogRef = this.dialog.open(CreatePostComponent);
    dialogRef.componentInstance.postCreated.subscribe(()=>{
      this.getPosts();
    });

  }
  
  getPosts(){
    this.service.getAllPostsForFeed().subscribe(
      (posts:Post[])=>{
        this.feedPosts = posts.filter((post)=>this.currentUser.following.some((followingUser)=>followingUser.id===post.user?.id) || post.user?.id === this.currentUser.id )
        .map(post => post)
        ;

        this.feedPosts.sort((a, b) => {
          let dateA:any;
          let dateB:any;
          if(a.addedDate!==undefined){
            dateA = new Date(a.addedDate).getTime();
          }
          if(b.addedDate!==undefined){
            dateB = new Date(b.addedDate).getTime();
          }
          
          return dateB! - dateA!;
        });

        // this.feedPosts=posts;

      },(error)=>{
        console.error('Error fetching posts', error);
      }
    )
  }
}

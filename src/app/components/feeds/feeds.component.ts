import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';
import { Post, UserDTO } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feedPosts:Post[]=[];
  constructor(private dialog:MatDialog,private service:UserService, private strgSer:StorageService){}
  currentUser!:UserDTO;
  ngOnInit(): void {
    this.service.getCurrentUser().subscribe(
      (user: UserDTO) => {
        this.currentUser = user;
      },
      (error) => {
        console.error("ngOnInit in Feeds comp",error);
      }
    );
    this.getPosts();
    
  }

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }
  
  getPosts(){
    this.service.getAllPostsForFeed().subscribe(
      (posts:Post[])=>{
        this.feedPosts = posts.filter((post)=>this.currentUser.following.some(followingUser=>followingUser.id===post.user?.id || post.user?.id === this.currentUser.id ))

        // this.feedPosts=posts;

      },(error)=>{
        console.error('Error fetching posts', error);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/model/user';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feedPosts:Post[]=[];
  constructor(private dialog:MatDialog,private service:UserService){}

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }
  
  getPosts(){
    this.service.getAllPostsForFeed().subscribe(
      (posts:Post[])=>{
        this.feedPosts=posts;

      },(error)=>{
        console.error('Error fetching posts', error);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Post, PostDTO } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  

  postsList!:PostDTO[];

  constructor(private postSer:PostService){}

  ngOnInit(): void {
    this.getPostsOfUser();

  }

  getPostsOfUser(){
    this.postSer.getPostsByUser().subscribe(
      (response)=>{
        console.log("The posts are",response);
        this.postsList = response;
        
      },(error)=>{
        console.log("Error fetching posts by the User",error);
      }
    )
  }
}

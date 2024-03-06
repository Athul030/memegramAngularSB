import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Post, PostDTO } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { FullSizeImageComponent } from '../full-size-image/full-size-image.component';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  
  @Input() otherUserPostsInput!:PostDTO[];
  @Input() isOwnProfileValues!:boolean;
  isOwnProfileValueInPostComp!:boolean;
  otherUserPostsList!:PostDTO[];
  postsList!:PostDTO[];

  constructor(private postSer:PostService, private route:ActivatedRoute, private dialog:MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['otherUserPostsInput'] && changes['otherUserPostsInput'].currentValue) {
      this.otherUserPostsList = changes['otherUserPostsInput'].currentValue;
    }
    if (changes['isOwnProfileValues'] && changes['isOwnProfileValues'].currentValue ) {
      this.isOwnProfileValueInPostComp = changes['isOwnProfileValues'].currentValue;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      if(userId===undefined){
        this.isOwnProfileValueInPostComp = true;

      }else{
        this.isOwnProfileValueInPostComp = false;
      }
      
      if (this.isOwnProfileValueInPostComp) {
        this.getPostsOfUser();
      this.otherUserPostsList = this.postsList.reverse();
      }
    });
  }

  getPostsOfUser(){
    this.postSer.getPostsByUser().subscribe(
      (posts: PostDTO[])=>{
        this.postsList = posts.reverse();
      },(error)=>{
        console.log("Error fetching posts by the User",error);
      }
    )
  }

  openImageModal(imageUrl:string):void{
    console.log("method clicked");
    console.log("imageurl",imageUrl);
    if(imageUrl!=undefined){
      const dialogRef = this.dialog.open(FullSizeImageComponent,{data:{imageUrl},
      })
      dialogRef.afterClosed().subscribe((result)=>{
        console.log("The image modal is closed");
      })
    }
  }
}

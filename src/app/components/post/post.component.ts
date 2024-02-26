import { Component, Input } from '@angular/core';
import { Post } from 'src/app/model/user';
import { LikeCommentService } from 'src/app/services/like-comment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  
  userId = this.storageSer.getUserId();
  
  @Input() postData!:Post;
  creatorName:string='';
  constructor(private likeSer:LikeCommentService,private storageSer:StorageService){

  }
  getCreatorInfo(){
    this.postData.user?.fullName
  }
  isLikedByUser(postData: Post): boolean {
    if(postData.likes===undefined) {
      return false;
    }
    return postData.likes.some((like: any) => like.userDTO && like.userDTO.id === this.userId);
  }


  likePost(postData:Post){
    if(postData.postId===undefined){
      return;
    }
   
    this.likeSer.likePost(this.userId,postData.postId).subscribe((response)=>{
      postData.likes?.push(response.likeDTO);
    })
  }

  unlikePost(postData:Post){
    
    if(postData.postId===undefined){
      return;
    }
    this.likeSer.unlikePost(this.userId,postData.postId).subscribe((response)=>{
      if(postData.likes){
        const likeIndex = postData.likes.findIndex((like)=>like.likeId === response.likeDTO.likeId);
        if(likeIndex!==-1){
          postData.likes.splice(likeIndex,1);
        }
      }
    })
  }



}

import { Component, Input } from '@angular/core';
import { Post, UserBlockRequest } from 'src/app/model/user';
import { LikeCommentService } from 'src/app/services/like-comment.service';
import { StorageService } from 'src/app/services/storage.service';
import { CommentmodalComponent } from '../commentmodal/commentmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { FullSizeImageComponent } from '../full-size-image/full-size-image.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  
  userId = this.storageSer.getUserId();
  
  @Input() postData!:Post;
  creatorName:string='';
  constructor(private likeSer:LikeCommentService,private storageSer:StorageService, private dialog:MatDialog, private router:Router,
    private userSer:UserService, private matSnack:MatSnackBar){

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

  openCommentModal():void{
    const dialogRef = this.dialog.open(CommentmodalComponent,{
      width :'400px',
      data:{postId:this.postData.postId, imageUrl:this.postData.imageUrl,lastComment:this.postData.lastComment}
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('The comment modal was closed');
    })

  }


  openImageModal(imageUrl:string):void{
    if(imageUrl!=undefined){
      const dialogRef = this.dialog.open(FullSizeImageComponent,{data:{imageUrl},
      })
      dialogRef.afterClosed().subscribe((result)=>{
        console.log("The image modal is closed");
      })
    }
  }

  navigateToUserProfile(userId:number):void{
    if(userId===this.userId){
      return;
    }
    this.router.navigate(['/profile',userId]);
  }

  blockUser(blockedId:number){
    const userblockRequest:UserBlockRequest={
      blockingUserId: this.userId,
      blockedUserId : blockedId
    }
    this.userSer.blockUser(userblockRequest).subscribe(
      (response)=>{
        console.log(response);
      },(error)=>{
        console.log("Error in blocking User, error")
      }
    )
  }

  reportUser(id:number | undefined,postData:Post | undefined){
    if(id === undefined || postData?.postId === undefined){
      return;
    }
    if(postData.user?.id === this.userId){
      console.log("same user");
      return;
    }
    const reason="Spam"
    this.userSer.reportUser(id,postData.postId,reason).subscribe(
      (response)=>{
        if(response === true){
          this.matSnack.open(
            'User Reported','Ok',{
              duration:3000,
              panelClass: 'custom-snack-bar-container'
            }
          )
        }
      },(error)=>{
        console.log(error);
        if(error instanceof HttpErrorResponse && error.status===409){
        this.matSnack.open(
          'You have already reported this user and this post', 'Ok', {
          duration: 3000,
          panelClass: 'custom-snack-bar-container'
        });
      }
        console.log("User reporting is unsuccessful", error);
      }
    )
  }

  isSameUser(id:number | undefined){
    if(id === undefined){
      return;
    }
    return id === this.userId;

  }

}

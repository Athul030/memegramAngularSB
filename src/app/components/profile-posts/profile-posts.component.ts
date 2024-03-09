import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Post, PostDTO } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { FullSizeImageComponent } from '../full-size-image/full-size-image.component';
import { CommentmodalComponent } from '../commentmodal/commentmodal.component';
import { StorageService } from 'src/app/services/storage.service';
import { LikeCommentService } from 'src/app/services/like-comment.service';
import { CommentDTO, LikeDTO } from 'src/app/model/likeComment';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  
  userId = this.storageSer.getUserId();


  @Input() otherUserPostsInput!:PostDTO[];
  @Input() isOwnProfileValues!:boolean;
  isOwnProfileValueInPostComp!:boolean;
  otherUserPostsList!:PostDTO[];
  postsList!:PostDTO[];

  constructor(private postSer:PostService, private route:ActivatedRoute, private dialog:MatDialog,private storageSer:StorageService,
    private likeSer:LikeCommentService){}

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

  handleImage(event:MouseEvent,imageUrl:string):void{
    
      const targetElement = event?.target as HTMLElement;
      if(!(targetElement.classList && targetElement.classList.contains('material-icons'))){
        this.openImageModal(imageUrl);
      }
    
    
  }

  openCommentModal(postId:number,imageUrl:string,lastComment:CommentDTO):void{
    const dialogRef = this.dialog.open(CommentmodalComponent,{
      width :'400px',
      data:{postId:postId, imageUrl,lastComment}
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('The comment modal was closed');
    })

  }


  isLikedByUser(postData: PostDTO): boolean {
    if(postData.likes===undefined) {
      return false;
    }
    return postData.likes.some((like: LikeDTO) => like.user && like.user.id === this.userId);
  }


  likePost(postData:PostDTO){
    if(postData.postId===undefined){
      return;
    }
    this.likeSer.likePost(this.userId,postData.postId).subscribe((response)=>{
      postData.likes?.push(response.likeDTO);
    })
  }

  unlikePost(postData:PostDTO){
    
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

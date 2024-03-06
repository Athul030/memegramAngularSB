import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentDTO } from 'src/app/model/likeComment';
import { LikeCommentService } from 'src/app/services/like-comment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-commentmodal',
  templateUrl: './commentmodal.component.html',
  styleUrls: ['./commentmodal.component.css']
})
export class CommentmodalComponent implements OnInit {

  @Input() postId!: number;
  imageUrl: string = '';
  comment: string = '';
  comments: CommentDTO[] = [];
  currentUserId!:number;
  

  constructor(public dialogRef: MatDialogRef<CommentmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string, postId: number, lastComment?: CommentDTO }, private likeComSer: LikeCommentService, private strgSer: StorageService) {

  }

  ngOnInit(): void {
    this.imageUrl = this.data.imageUrl;
    this.postId = this.data.postId;
    this.currentUserId = this.strgSer.getUserId();
    this.likeComSer.getAllComments(this.postId).subscribe((allComments) => {
      console.log("all comments", allComments);

      if (allComments) {
        this.comments = allComments;
      }
    });
  }

  

  close(): void {
    this.dialogRef.close();
  }

  submitComment(commentText: string): void {
    console.log(commentText);
    const userId = this.strgSer.getUserId();
    this.likeComSer.addComment(this.postId, userId, commentText).subscribe((response) => {
      this.comments.push(response);

      // Refresh comments after adding a new comment
      this.likeComSer.getAllComments(this.postId).subscribe((allComments) => {

        if (allComments) {
          this.comments = allComments;
        }
      });
    });
    this.comment = ''; // Clear the input field
  }

  deleteComment(comment:CommentDTO){
    
    this.likeComSer.deleteComment(comment.commentId).subscribe(
      ()=>{
       this.comments = this.comments.filter((x)=>x.commentId!==comment.commentId);
      },(error)=>{
        console.log("not deleted");
      }
    )
  }

  isSameUser(id:number | undefined){
    if(id === undefined){
      return;
    }
    return id !== this.currentUserId;

  }

}

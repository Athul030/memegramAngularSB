import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @Output() postCreated:EventEmitter<void> = new EventEmitter<void>();

  selectedImageFile :File | undefined;
  constructor(private service:UserService, private snackBar:MatSnackBar, private dialog:MatDialogRef<CreatePostComponent>){}
  ngOnInit():void{

  }

  onPhotoSelected(photoSelector:HTMLInputElement){
    if (photoSelector && photoSelector.files && photoSelector.files.length > 0) {
      this.selectedImageFile = photoSelector.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedImageFile);
      fileReader.addEventListener(
        "loadend",
        ev=>{
          let readableString :string|undefined= fileReader.result?.toString();
          let postPreviewImage : HTMLImageElement  = <HTMLImageElement>document.getElementById("post-preview-image") ;
          if (readableString !== undefined && postPreviewImage !== null) {
            postPreviewImage.src = readableString;
          } else {
            console.error("Either readableString is undefined or postPreviewImage is null");
          }
        }
      );
    } else {
      // Handle the case where photoSelector or its files property is null
      console.error("No file selected");
    }
  }

  onPostClick(commentInput:HTMLTextAreaElement){
    let comment  = commentInput.value;
    const newPost: Post={
      title:"Title",
      content:comment
    }
    let categoryId:number = 1; //change it later
    if(this.selectedImageFile!=null){
      this.service.createPost(newPost,categoryId,this.selectedImageFile)
      .subscribe(response=>{
        console.log('resp',response);
          if(response.status == 201){
            this.snackBar.open('Post Uploaded','Close',{
              duration:3000, panelClass: 'custom-snack-bar-container',
            });
            this.postCreated.emit();
            this.dialog.close();
          }else{
            console.log('resp',response)
            console.log('Error creating post. Status code:', response.status);
            this.snackBar.open("Error creating post, Try again",'Ok', {
              duration:3000,
              panelClass: 'custom-snack-bar-container',
            })
          }
      }, error=>{
          console.error('HTTP ERROR',error);
          this.snackBar.open("Error creating post at the moment, Try again later",'Ok', {
            duration:3000,
            panelClass: 'custom-snack-bar-container',
          })
          }
      )
     }
  }




  
}

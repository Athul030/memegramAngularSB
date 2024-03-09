import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import * as StoreActions from 'src/app/store/store.actions'


@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.css']
})
export class ChangeProfilePicComponent {
  selectedImageFile :File | undefined;
  constructor(private service:UserService, private snackBar:MatSnackBar, private dialog:MatDialogRef<ChangeProfilePicComponent>, private store:Store, private changeDetectorRef:ChangeDetectorRef){}

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


  onChangeDPClick(){
    if(this.selectedImageFile!=null){
      this.service.changeDP(this.selectedImageFile)
      .subscribe(response=>{
          if(response.status == 200 || response.status == 201 ){
            const fileUrl = response.body?.fileUrl;

          if (fileUrl) {

            this.store.dispatch(StoreActions.setProfilePicture({ imageUrl: fileUrl }));
            this.changeDetectorRef.detectChanges();
          }
            this.snackBar.open('DP Changed','Close',{
              duration:3000, panelClass: 'custom-snack-bar-container',
            });

            
            this.dialog.close();
          }else{
            console.log('resp',response)
            console.log('Error changing DP. Status code:', response.status);
            this.snackBar.open("Error changing DP, Try again",'Ok', {
              duration:3000,
              panelClass: 'custom-snack-bar-container',
            })
          }
      }, (error: any)=>{
          console.error('HTTP ERROR',error);
          this.snackBar.open("Error Changing DP at the moment, Try again later",'Ok', {
            duration:3000,
            panelClass: 'custom-snack-bar-container',
          })
          }
      )
     }
  }



}

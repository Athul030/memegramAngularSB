import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-memegenerator',
  templateUrl: './memegenerator.component.html',
  styleUrls: ['./memegenerator.component.css']
})
export class MemegeneratorComponent {

  lineOneText:string = '';
  lineTwoText:string = '';
  fileEvent:any;
  selectedImageFile :File | undefined;

  constructor(private service:UserService, private snackBar:MatSnackBar,private router:Router){
    
  }
  @ViewChild('designerCanvas',{static:false}) designerCanvas!:any;

  preview = (event:any) =>{
    console.log('preview file',event);
    this.fileEvent = event;
    const canvas = this.designerCanvas.nativeElement;
    const context = canvas.getContext('2d');

    

    
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (e:any) =>{
      console.log('fileReader onload',e);
      const img = new Image();
      img.src = e.target.result as string;

      img.onload = () =>{
        context.drawImage(img,50,125,600,500);
        const borderWidth = 1; 
        context.strokeStyle = '#a5a8ac'; 
        context.lineWidth = borderWidth;
        context.strokeRect(0, 0,canvas.width, canvas.height);
    
      }
    }
  }

  updateLineText = () =>{
    const canvas = this.designerCanvas.nativeElement;
    const context = canvas.getContext('2d');

    context.clearRect(0,0,canvas.width,canvas.height);
    this.preview(this.fileEvent)

    context.font = "50px Anton";
    context.fillStyle = "black";
    context.textAlign = "center";
    
    context.fillText(this.lineOneText.toUpperCase(),canvas.width/2,100);
    context.fillText(this.lineTwoText.toUpperCase(),canvas.width/2,
    700)
  }

  
  uploadImage = (commentInput:HTMLTextAreaElement) =>{
    console.log('uploading image...');
    let comment  = commentInput.value;
    const newPost: Post={
      title:"Title",
      content:comment
    }
    let categoryId:number = 1;

    const canvas = this.designerCanvas.nativeElement;
    const data = canvas.toDataURL();

    let file1 = this.fileEvent.target.files[0]; // Get the file object from the event

    // Use the file name from the input element
    let fileName = file1.name;

    //to convert from data to file
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        console.error('Invalid data URL format');
        return;
    }

    const mimeString = matches[1];
    const byteString = atob(matches[2]);

    // Extract file extension from MIME type
    const extensionMatches = mimeString.match(/\/(.+)/);
    const extension = extensionMatches ? extensionMatches[1] : 'png';

   


  

    console.log("FIle name is:" + fileName)

    // Convert data URL to Blob
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Create File object
    let file = new File([blob], fileName, { type: mimeString });

    // Set selectedImageFile to the created File object
    this.selectedImageFile = file;

    //conversion done

    if(this.selectedImageFile!=null){
      this.service.createPost(newPost,categoryId,this.selectedImageFile)
      .subscribe(response=>{
        console.log('resp',response);
          if(response.status == 201){
            this.snackBar.open('Post Uploaded','Close',{
              duration:3000, panelClass: 'custom-snack-bar-container',
            });
            this.router.navigate(['/home'])
          }else{
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

  isLoginOrRegisterRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }

}

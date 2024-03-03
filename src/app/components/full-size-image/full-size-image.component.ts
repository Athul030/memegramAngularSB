import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-full-size-image',
  templateUrl: './full-size-image.component.html',
  styleUrls: ['./full-size-image.component.css']
})
export class FullSizeImageComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{imageUrl:string}){
    
  }
}

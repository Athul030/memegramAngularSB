import { Component, Input } from '@angular/core';
import { Post } from 'src/app/model/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() postData!:Post;
  creatorName:string='';
  

  getCreatorInfo(){
    this.postData.user?.fullName
  }
}

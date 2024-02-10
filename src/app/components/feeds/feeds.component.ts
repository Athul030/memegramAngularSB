import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(private dialog:MatDialog){}

  ngOnInit(): void {
    
  }

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }
  

}

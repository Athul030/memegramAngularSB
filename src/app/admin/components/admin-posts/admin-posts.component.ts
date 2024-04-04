import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { Page, Post, PostDTO } from 'src/app/model/user';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  displayedColumns: string[] = ['title','content','imageUrl','addedDate'];
  datasource:MatTableDataSource<Post> =new MatTableDataSource<Post>();
  pageIndex:number = 0;
  pageSize:number =5;
  //change
  totalElements:number = 0;
  //change
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor( private service:AdminService) {} 
  postList:PostDTO[]=[];
  ngOnInit() {

    this.getPosts(0,5);
    
  }

  private getPosts(page:number,size:number){

    this.service.getAllPosts(page,size).subscribe(data=>{
      console.log(data);
      this.postList = data['content'];
      this.totalElements=data['totalElements'];
        })
  }



  
  nextPage(event:PageEvent){
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    this.getPosts(pageIndex,pageSize);
  }

  toggleBlockPost(post:Post) { 
    const postId = post.postId!;

    if(post.block==false){
      this.service.blockPostByAdmin(postId).subscribe(
        (response)=>{
          console.log(response);
          const updatedPostDTO:PostDTO = response;
          const index = this.postList.findIndex(u=>u.postId == postId);
          if(index!== -1){
            this.postList[index] = updatedPostDTO;
          }

        }
      )
    }else{
      this.service.unBlockPostByAdmin(postId).subscribe(
        (response)=>{
          console.log(response);
          const updatedPostDTO:PostDTO = response;
          const index = this.postList.findIndex(u=>u.postId == postId);
          if(index!==-1){
            this.postList[index] = updatedPostDTO;
          }
        }
      )
    }

    
  }

  

}

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


  // fetchPosts(pageIndex:number,pageSize:number){
  //   this.service.getAllPosts(pageIndex,pageSize).subscribe((page: Page<PostDTO>)=>{
      
  //     this.datasource = new MatTableDataSource(page.content);
  //     this.datasource.paginator = this.paginator;
  //     this.paginator.length = page.totalElements;
  //   },
  //   (error) => {
  //     console.error('Error fetching posts', error);
  //   }
  //   );
  // }
  
  nextPage(event:PageEvent){
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    this.getPosts(pageIndex,pageSize);
  }

  toggleBlockPost(post:Post) { 

    
  }

  

}

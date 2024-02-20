import { Component, OnInit, ViewChild } from '@angular/core';
import { Page, User, UserDTO } from 'src/app/model/user';
import { AdminService } from '../../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  pageIndex:number = 0;
  pageSize:number = 5;

  //change
  totalElements:number = 0;
  //change
  constructor( private service:AdminService) {} 
  // @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;
  // datasource =new MatTableDataSource<any>();
  userList:UserDTO[]=[];
  displayedColumns: string[] = ['fullName','email','userHandle','blockAction','provider'];
  ngOnInit() {
    

    //change
    this.getUsers(0,5);
    //change

  }

  private getUsers(page:number,size:number){

    this.service.getAllUsers(page,size).subscribe(data=>{
      console.log(data);
      this.userList = data['content'];
      this.totalElements=data['totalElements'];
        })
  }

  nextPage(event:PageEvent){
    let page:number=event.pageIndex;
    let size:number= event.pageSize;
    this.getUsers(page,size);
  }

    // fetchUsers(){
    //   this.service.getAllUsers(this.pageIndex,this.pageSize).subscribe((usersPage: Page<UserDTO>)=>{
    //     console.log(usersPage);
    //     this.datasource = new MatTableDataSource(usersPage.content);
    //     this.datasource.paginator = this.paginator;
    //     this.paginator.length = usersPage.totalElements;
    //   },(error)=>{
    //     console.log("Error fetching users", error)
    //   }
      
    //   );
    // }

  toggleBlockUser(user:User) { 

    // this.service.toggleBlock(user.id!)
      
  }

  
    
  
}

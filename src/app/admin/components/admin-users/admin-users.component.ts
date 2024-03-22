import { Component, OnInit, ViewChild } from '@angular/core';
import { Page, User, UserBlockRequest, UserDTO } from 'src/app/model/user';
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
  
  userList:UserDTO[]=[];
  displayedColumns: string[] = ['fullName','email','userHandle','blockAction','reportedCount','provider'];
  ngOnInit() {
    

    //change
    this.getUsers(0,5);
    //change

  }

  private getUsers(page:number,size:number){

    this.service.getAllUsers(page,size).subscribe(data=>{
      
      this.userList = data['content'];
      this.totalElements=data['totalElements'];
        })
  }

  nextPage(event:PageEvent){
    let page:number=event.pageIndex;
    let size:number= event.pageSize;
    this.getUsers(page,size);
  }

  

  toggleBlockUser(user: UserDTO) {
    const userId = user.id!;

    if (user.blocked === false) {
      this.service.blockUserByAdmin(userId).subscribe((response) => {
        console.log(response);

        const updatedUser: UserDTO = response;
        const index = this.userList.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.userList[index] = updatedUser;
        }
      });
    } else {
      this.service.unBlockUserByAdmin(userId).subscribe((response) => {
        console.log(response);

        const updatedUser: UserDTO = response; 

        const index = this.userList.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.userList[index] = updatedUser;
        }
      });
    }
  }
   
  

  
    
  
}

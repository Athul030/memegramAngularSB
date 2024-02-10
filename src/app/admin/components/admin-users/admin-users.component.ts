import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AdminService } from '../../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

 

  constructor( private service:AdminService) {} 
  datasource =new MatTableDataSource<any>();
  userList:User[]=[];
  displayedColumns: string[] = ['fullName','email','userHandle','blockAction'];
  ngOnInit() {

    this.service.getAllUsers().subscribe((users:User[])=>{
      console.log(users);
      this.datasource.data = users;
    });
  }

  toggleBlockUser(user:User) { 

    
  }
}

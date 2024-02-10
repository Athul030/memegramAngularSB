import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private service:AdminService){

  }
  ngOnInit(): void {
      this.service.getAllPosts().subscribe(
        data=>{
          this.totalPostsNumber = data.length;
        }
      );


      this.service.getAllUsers().subscribe(
        data=>{
          this.totalUsersNumber = data.length;
        }
      );

  }
  totalUsersNumber:number=0
  totalPostsNumber:number=0

}

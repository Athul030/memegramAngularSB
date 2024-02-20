import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  totalUsersNumber!: number;
  totalPostsNumber!: number;

  constructor(private service:AdminService){

  }

  ngOnInit(): void {
    console.log("inside admin dash")

    this.service.getAllPostsForDashboard().subscribe(posts => {
      this.totalPostsNumber = posts.length;
    });
    

    this.service.getAllUsersForDashboard().subscribe(users => {
      this.totalUsersNumber = users.length;
    });
  }


}

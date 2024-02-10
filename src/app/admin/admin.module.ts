import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table'  
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminUsersComponent,
    AdminPostsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class AdminModule { }

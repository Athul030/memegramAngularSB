import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:'', children:[
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: 'admin', component: AdminComponent },
          { path: 'dashboard', component: AdminDashboardComponent },
          { path: 'users', component: AdminUsersComponent },
          { path: 'posts', component: AdminPostsComponent },
        ]
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule , [RouterModule.forChild(routes)]
  ]
})
export class AdminRoutingModule { }

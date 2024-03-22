import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path:'', children:[
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: 'admin', component: AdminComponent, canActivate:[adminGuard]},
          { path: 'dashboard', component: AdminDashboardComponent , canActivate:[adminGuard] },
          { path: 'users', component: AdminUsersComponent, canActivate:[adminGuard] },
          { path: 'posts', component: AdminPostsComponent , canActivate:[adminGuard]},
        ],canActivate:[adminGuard]
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule , RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule,Routes} from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { OauthCallbackComponent } from './components/oauth-callback/oauth-callback.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component:HomeComponent, pathMatch: 'full' },
  {path:'register',component:RegisterComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'postfeed',component:PostFeedComponent,pathMatch:'full'},

  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) },

  {path:'callback',component:OauthCallbackComponent ,pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

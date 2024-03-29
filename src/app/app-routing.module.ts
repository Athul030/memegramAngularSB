import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule,Routes} from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { OauthCallbackComponent } from './components/oauth-callback/oauth-callback.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { WebrtcVideoCallComponent } from './components/webrtc-video-call/webrtc-video-call.component';
import { MemegeneratorComponent } from './components/memegenerator/memegenerator.component';
import { VideoCall2Component } from './components/video-call2/video-call2.component';
import { Videocall3Component } from './components/videocall3/videocall3.component';
import { VideocallScreenComponent } from './components/videocall-screen/videocall-screen.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component:HomeComponent, pathMatch: 'full' , canActivate:[authGuard]},
  { path: 'register',component:RegisterComponent,pathMatch:'full'},
  { path: 'login',component:LoginComponent,pathMatch:'full'},

  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) , canActivate:[authGuard] },

  { path: 'callback',component:OauthCallbackComponent ,pathMatch:'full'},
  { path: 'profile',component:ProfileComponent ,pathMatch:'full', canActivate:[authGuard]},
  { path: 'profile/:userId',component:ProfileComponent ,pathMatch:'full', canActivate:[authGuard]},
  { path: 'chat',component:ChatComponent ,pathMatch:'full', canActivate:[authGuard]},
  { path: 'chat/:roomId',component:ChatComponent ,pathMatch:'full', canActivate:[authGuard]},
  { path:'videoCall',component:Videocall3Component , pathMatch:'full', canActivate:[authGuard]},
  { path:'videoCall/:userId/:otherUserId',component:Videocall3Component , pathMatch:'full', canActivate:[authGuard]},
  // { path:'videoCall2/:userId/:otherUserId',component:VideoCall2Component , pathMatch:'full'},
  { path:'webRtcVideoCall',component: WebrtcVideoCallComponent , pathMatch:'full', canActivate:[authGuard]},
  // { path:'webRtcVideoCall/:userId',component: WebrtcVideoCallComponent , pathMatch:'full'}
  { path:'meme',component: MemegeneratorComponent , pathMatch:'full', canActivate:[authGuard]},
  { path:'videoScreen',component:VideocallScreenComponent, pathMatch:'full', canActivate:[authGuard] },
  { path:'videoScreen/:otherUserId',component:VideocallScreenComponent, pathMatch:'full', canActivate:[authGuard] }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

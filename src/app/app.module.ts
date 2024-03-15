import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { storeEffects } from './store/store.effects';
import { OauthCallbackComponent } from './components/oauth-callback/oauth-callback.component';
import { AuthInterceptInterceptor } from './interceptor/auth-intercept.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { MatCardModule } from '@angular/material/card';
import { PostComponent } from './components/post/post.component';
import { ChangeProfilePicComponent } from './components/change-profile-pic/change-profile-pic.component';
import { dpReducer } from './store/store.reducer';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileFollowersComponent } from './components/profile-followers/profile-followers.component';
import { ProfileFollowingComponent } from './components/profile-following/profile-following.component';
import { ChatComponent } from './components/chat/chat.component';
import { CommentmodalComponent } from './components/commentmodal/commentmodal.component';
import { MatMenuModule } from '@angular/material/menu';
import { ChatLeftSectionComponent } from './components/chat-left-section/chat-left-section.component';
import { ChatRightSectionComponent } from './components/chat-right-section/chat-right-section.component';
import { FullSizeImageComponent } from './components/full-size-image/full-size-image.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PickerComponent } from '@ctrl/ngx-emoji-mart'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as LogRocket from 'logrocket';
import { VideocallComponent } from './components/videocall/videocall.component';
import { WebrtcVideoCallComponent } from './components/webrtc-video-call/webrtc-video-call.component';
import { MemegeneratorComponent } from './components/memegenerator/memegenerator.component';

//initlaize log rocket
export function initializeLogRocket(){
  return ()=>LogRocket.init('u65bs3/memegram');

}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    RightSideBarComponent,
    FeedsComponent,
    OauthCallbackComponent,
    CreatePostComponent,
    PostComponent,
    ChangeProfilePicComponent,
    ProfileComponent,
    ProfileContentComponent,
    ProfilePostsComponent,
    ProfileFollowersComponent,
    ProfileFollowingComponent,
    ChatComponent,
    CommentmodalComponent,
    ChatLeftSectionComponent,
    ChatRightSectionComponent,
    FullSizeImageComponent,
    VideocallComponent,
    WebrtcVideoCallComponent,
    MemegeneratorComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    PickerComponent,
    StoreModule.forRoot({dp:dpReducer}, {}),
    EffectsModule.forRoot([storeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
    }),
    
    ],
  providers: [
    {
      provide:APP_INITIALIZER,
      useFactory:initializeLogRocket,
      multi:true,
    },
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptInterceptor,
    multi:true
  },MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }

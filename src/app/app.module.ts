import { NgModule } from '@angular/core';
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
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { MatButtonModule } from '@angular/material/button';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { MatCardModule } from '@angular/material/card';
import { PostComponent } from './components/post/post.component';
import { ChangeProfilePicComponent } from './components/change-profile-pic/change-profile-pic.component';
import { dpReducer } from './store/store.reducer';
import { ProfileComponent } from './components/profile/profile.component';


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
    PostFeedComponent,
    CreatePostComponent,
    PostComponent,
    ChangeProfilePicComponent,
    ProfileComponent
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

    StoreModule.forRoot({dp:dpReducer}, {}),
    EffectsModule.forRoot([storeEffects])
    
    ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptInterceptor,
    multi:true
  },MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }

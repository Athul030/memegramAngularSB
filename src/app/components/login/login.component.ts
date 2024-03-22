import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { environment } from 'src/app/environments/environment';
import { AuthResponse, UserCred } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { beginLogin } from 'src/app/store/store.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup;

  

  constructor(private builder:FormBuilder, private store:Store, private service:UserService,private http:HttpClient){

  }

  ngOnInit():void{
    console.log("oninitLogin")
    this.loginForm = this.builder.group({
      username:this.builder.control('',[Validators.required,Validators.email]),
      password:this.builder.control('',[Validators.required])
    });

  }


  onLogin(){

   if(this.loginForm.valid){

    const obj:UserCred={
      username:this.loginForm.value.username as string,
      password: this.loginForm.value.password as string
    }
    console.log("User info"+obj.username)
    console.log("User info"+obj.password)

    this.store.dispatch(beginLogin({usercred:obj}))
   }
  }

    signInWithGoogle() {
      // my OAuth login endpoint 
      window.location.href = `${environment.apiUrl}/oauth2/authorization/google`;

    }

    
    
    
  }


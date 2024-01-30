import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserCred } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { beginLogin } from 'src/app/store/store.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup;

  

  constructor(private builder:FormBuilder, private store:Store){

  }

  ngOnInit():void{
    console.log("oninit")
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

    this.store.dispatch(beginLogin({usercred:obj}))
   }
  }
    
  }


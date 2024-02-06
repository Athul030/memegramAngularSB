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

  

  constructor(private builder:FormBuilder, private store:Store, private service:UserService){

  }

  ngOnInit():void{
    console.log("oninit")
    this.loginForm = this.builder.group({
      username:this.builder.control('',[Validators.required,Validators.email]),
      password:this.builder.control('',[Validators.required])
    });

    this.handleCallback();
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



    signInWithGoogle() {
      // Redirect to your OAuth login endpoint (replace 'your-oauth-endpoint' with the actual OAuth endpoint)
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';

    }

    handleCallback() {
      const queryParams = new URLSearchParams(window.location.search);
      const responseJson = queryParams.get('response');

      // Check if responseJson is not null before parsing
      if (responseJson !== null) {
        // Parse the JSON response
        const response = JSON.parse(responseJson);
    
        // Now you can use the response object as needed
        console.log(response);
      } else {
        console.error('Response JSON is null.');
      }

    }
    
  }


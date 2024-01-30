import { Component } from '@angular/core';
import { UserCred } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string = '';
  password:string='';

  constructor(private service:UserService){

  }

  userCred:UserCred={
  username:'',
  password:''
  };

  onSubmit():void{

    this.userCred = {
      username: this.username,
      password: this.password
    };

    this.service.login(this.userCred).subscribe(
      (customToken)=>{
        console.log(customToken.user,customToken.username,customToken);
        const token = customToken.token;
        // localStorage.setItem('token',token);
      },
      (error)=>{
        console.log(error)
      }
    );
  }



  handleButtonClick():void{
    console.log('Button is clicked');
    this.service.testMethod().subscribe({
      next: (response: string) => {
        console.log('Request successful. Response:', response);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
  });
    
  }
}

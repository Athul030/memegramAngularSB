import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  regForm!: FormGroup;

  constructor(private builder:FormBuilder,private userService:UserService, private snack:MatSnackBar){
    
  }

  ngOnInit():void{
    this.regForm = this.builder.group({
      fullName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      rePassword: this.builder.control('', [Validators.required]),
      phoneNumber: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(10)])),
      userHandle: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)]))
    })
  }

  onSubmit(){
    if(this.regForm.valid){
      if(this.regForm.value.password === this.regForm.value.rePassword){
        const userobj: User = {
          fullName: this.regForm.value.firstName as string,
          email: this.regForm.value.email as string,
          password: this.regForm.value.password as string,
          phoneNumber: this.regForm.value.phoneNumber as string,
          userHandle: this.regForm.value.username as string,          
        }
        this.userService.registerUser(userobj).subscribe(
          (datas)=>{console.log(datas)}
        );

      }else{
        this.snack.open("Passwords dont Match",'Ok', {
          duration:3000
        })
      }
    }else{
      this.snack.open("Please enter all fields",'Ok', {
        duration:3000
      })  
    }
  }



}

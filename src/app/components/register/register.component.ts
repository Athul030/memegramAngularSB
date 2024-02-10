import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { showalert } from 'src/app/store/store.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  regForm!: FormGroup;

  constructor(private route:Router, private builder:FormBuilder,private userService:UserService, private _snack:MatSnackBar, private store:Store){
    
  }

  ngOnInit():void{
    this.regForm = this.builder.group({
      fullName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      rePassword: this.builder.control('', [Validators.required]),
      userHandle: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
      bio: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),

    })
  }

  onSubmit(){
    console.log("onsubmit")
    console.log(this.regForm.valid)
    console.log('Form:', this.regForm.value);
  console.log('Errors:', this.regForm.errors);


    if(this.regForm.valid){
      

      if(this.regForm.value.password === this.regForm.value.rePassword){

        const userobj: User = {
          fullName: this.regForm.value.fullName as string,
          email: this.regForm.value.email as string,
          password: this.regForm.value.password as string,
          userHandle: this.regForm.value.userHandle as string,
          bio: this.regForm.value.bio as string,
          
        }
        this.userService.registerUser(userobj).subscribe(
          (datas)=>{
            this.route.navigate(['login'])

            this.store.dispatch(showalert(({ message: 'Registered successfully.', resulttype: 'pass'  })));
          }
        ,(error:string)=>{
          console.error(error);
          if(error === 'Email alread in use'){
            console.log('inside error');

            this._snack.open(
              'Email id already in use','Ok',{
                duration:3000,
                panelClass: 'custom-snack-bar-container',
              }
            )
          }
        }
        );
      }else{
        this._snack.open("Passwords dont Match",'Ok', {
          duration:3000,
          panelClass: 'custom-snack-bar-container',
        })
      }
    }else{
      this._snack.open("Please enter all fields",'Ok', {
        duration:3000,
        panelClass: 'custom-snack-bar-container',
      })  
    }
  }



}

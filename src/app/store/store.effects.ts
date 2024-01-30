import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { beginLogin, emptyaction, showalert } from "./store.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { UserService } from "../services/user.service";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Role } from "../model/user";


@Injectable()
export class storeEffects{
    
    constructor( private action$:Actions, private userService:UserService, private storage:StorageService,
        private route:Router, private snackbar:MatSnackBar){

    }

    userlogin = createEffect(()=>{
        return this.action$.pipe(
            ofType(beginLogin),
            mergeMap((action)=>{
                return this.userService.login(action.usercred).pipe(
                    switchMap((data)=>{
                        console.log(data)
                        if(data.user!==null){
                            console.log("1");

                                this.storage.saveToken(data.token);
                                this.storage.saveUser(data.user);
                                console.log("User Data:", data.user.authorities?.length);
                                if (data.user && data.user.authorities){
                                for(let item of data.user.authorities){
                                    console.log("3");

                                          if (item.name === 'ROLE_ADMIN') {
                                            this.route.navigate(['admin']);
                                          } else {
                                            this.route.navigate(['home']);
                                          }
                                        
                                        }
                                } else {
                                    console.error('Authorities are undefined in user data.');
                                  }

                                return of(showalert({message:'Login success.',resulttype:'pass'}));
                            
                        }else{
                            return of(showalert({message:'Login failed:Inavlid cred',resulttype:'fail'}))
                        }
                    }),
                    catchError((_error)=>of(showalert({message:'Login failed due to:'+_error.error,resulttype:"fail"
                    })))
                )
            })
        )
    })



    _showalert = createEffect(() =>
        this.action$.pipe(
            ofType(showalert),
            exhaustMap((action) => {
                return this.Shownsnackbaralert(action.message, action.resulttype).afterDismissed().pipe(
                    map(() => {
                        return emptyaction();
                    })
                )
            })
        )
    )

    Shownsnackbaralert(message:string,resulttype:string = 'fail'){
        let _class = resulttype == 'pass'? 'green-snackbar' : 'red-snackbar'
        return this.snackbar.open(message,'OK',{
            verticalPosition:'top',
            horizontalPosition:'end',
            duration:5000,
            panelClass:[_class]
        })
    }
}



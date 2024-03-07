import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {  beginLogin, beginRegister, emptyaction, showalert } from "./store.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { UserService } from "../services/user.service";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Role } from "../model/user";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";


@Injectable()
export class storeEffects{
    
    constructor( private action$:Actions, private userService:UserService, private storage:StorageService,
        private route:Router, private snackbar:MatSnackBar, private store:Store){

    }

    _userregister = createEffect(() =>
this.action$.pipe(
    ofType(beginRegister),
    mergeMap((action) => {
        return this.userService.registerUser(action.userdata).pipe(
            map((response) => {
              
                this.route.navigate(['login'])
                return showalert({ message: 'Registered successfully.', resulttype: 'pass' })
              
            }),
            catchError((_error) => of(showalert({ message: 'Registerion Failed due to :.' + _error.error, resulttype: 'fail' })))
        )
    })
)
)

    userlogin = createEffect(()=>{
        return this.action$.pipe(
            ofType(beginLogin),
            mergeMap((action)=>{

                return this.userService.login(action.usercred).pipe(
                    switchMap((data)=>{

                        console.log("data"+data.accessToken,data.refreshToken,data.username);
                        if(data.user!==null){

                                this.storage.saveAccessToken(data.accessToken);
                                this.storage.saveRefreshToken(data.refreshToken);
                                this.storage.saveUser(data.user);
                                if (data.user && data.user.roles){
                                for(let item of data.user.roles){

                                          if (item.name === 'ROLE_ADMIN') {
                                            this.route.navigate(['admin']);
                                          } else {
                                            // if(data.user.id !==undefined){
                                            //     this.store.dispatch(addUserToPresence({userId:data.user.id}));
                                            // }
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
                    
                    catchError((_error)=>{
                        if(_error instanceof HttpErrorResponse && _error.status === 423){
                            this.snackbar.open(
                                'You are blocked from acessing Memegram', 'Ok', {
                                duration: 3000,
                                panelClass: 'custom-snack-bar-container'
                              });
                              return of(showalert({message:'You are blocked from acessing Memegram',resulttype:"fail"}));
                        }else{
                            return of(showalert({message:'Login failed due to:'+_error.error.message,resulttype:"fail"}));
                        }
                        
                    })

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



import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../services/storage.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router = Inject(Router);
  const _snack = Inject(MatSnackBar);

  if(StorageService.getUser()=== null && StorageService.getTokens() === null){
    router.navigateByUrl("/login");
    _snack.open("You are not logged in", "Close",{duration: 5000});
    
      return false;
  }

  return true;

 
  
};

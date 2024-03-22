import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);
  const _snack= inject(MatSnackBar);
  const b="aa";

if(StorageService.getUser()!== null && StorageService.getAccessToken() !== null && StorageService.isUserLoggedIn()){

  router.navigateByUrl("/home");
  _snack.open("You don't have Access to the page", "Close",{duration: 5000});
  
    return false;
}



return true;
};

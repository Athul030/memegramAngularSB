import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';


// export const authGuard: CanActivateFn = (route, state) => {

//   const router = inject(Router);
//   const _snack = inject(MatSnackBar);

//   if(StorageService.getUser()=== null && StorageService.getTokens() === null){
//     router.navigateByUrl("/login");
//     _snack.open("You are not logged in", "Close",{duration: 5000});
    
//       return false;
//   }
//   return true;

// };

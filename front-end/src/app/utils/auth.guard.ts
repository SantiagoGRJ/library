import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let token = localStorage.getItem('token')

  let _router = inject(Router)
  
  if(token == undefined){
    _router.navigate(['/'])  
  }

  return true;
};

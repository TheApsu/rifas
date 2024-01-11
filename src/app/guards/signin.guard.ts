import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const signinGuard: CanActivateFn = async (route, state) => {
  const authSv = inject(AuthService);
  const router = inject(Router);
  authSv.getLocalUser();
  console.log('authSv.user :>> ', authSv.user);
  if (authSv.user) {
    await router.navigate(['home'], {
      replaceUrl: true,
    });
    return false;
  } else {
    return true;
  }
};

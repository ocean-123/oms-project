import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

export const authGuard = (allowedRoles?: string[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (allowedRoles && !authService.hasRole(allowedRoles)) {
    router.navigate(['/dashboard']); // or /unauthorized
    return false;
  }

  return true;
};
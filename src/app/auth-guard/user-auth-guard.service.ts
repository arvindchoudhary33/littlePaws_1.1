import { Injectable } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserAuthGuardService {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    var isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/sign-up']);
    } return isAuthenticated;
  }
}

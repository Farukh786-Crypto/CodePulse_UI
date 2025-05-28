import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../login/services/auth.service';
import { ApplicationRoute } from '../../../app-routing.module';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Promise<boolean> {
    const user = this.authService.getUser();
    let token = this.cookieService.get('Authorization');

    if (token && user) {
      token = token.replace('Bearer ', '');
      const decoded: any = jwtDecode(token);

      const expirationDate = decoded.exp * 1000; // Fix: use `* 1000` instead of `= 1000`
      const currentTime = new Date().getTime();

      if (expirationDate < currentTime) {
        this.authService.logout();
        this.router.navigate([ApplicationRoute.Login], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      } else {
        return user.roles.includes('Writer');
      }
    } else {
      this.authService.logout();
      this.router.navigate([ApplicationRoute.Login], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}

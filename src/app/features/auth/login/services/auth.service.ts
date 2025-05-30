import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest } from '../../../../common/Models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../../../../common/Models/login-response.model';
import { HttpService } from '../../../category/Services';
import { User } from '../../../../common/Models/User.model';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);
  private isBrowser: boolean;

  constructor(
    private https: HttpService,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.https.post<LoginResponse>('Auth/Login', request);
  }

  getUser(): User | undefined {
    debugger;
    if (this.isBrowser) {
      debugger;
      const email = localStorage.getItem('user-email');
      const roles = localStorage.getItem('user-roles');
      if (email && roles) {
        const user: User = {
          email,
          roles: roles.split(','),
        };
        return user;
      }
    }
    return undefined;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
      this.cookieService.delete('Authorization', '/');
    }
    this.$user.next(undefined);
  }

  setUser(user: User): void {
    this.$user.next(user);
    if (this.isBrowser) {
      try {
        localStorage.setItem('user-email', user.email);
        localStorage.setItem('user-roles', user.roles.join(','));
      } catch (e) {
        console.error('Error setting user in localStorage:', e);
      }
    }
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }
}

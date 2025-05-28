import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookiesService: CookieService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    debugger;
    if (req.headers.has('Skip-Auth')) {
      const cloned = req.clone({
        headers: req.headers.delete('Skip-Auth'),
      });
      return next.handle(cloned); // skip auth header
    }

    const authToken = this.cookiesService.get('Authorization');
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
      },
    });

    return next.handle(authReq);
  }
}

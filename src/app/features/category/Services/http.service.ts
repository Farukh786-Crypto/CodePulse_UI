import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ApplicationRoute, RouteTo } from '../../../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  //baseUrl:string = 'http://localhost:5029/api/';
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('CODEBASEURL') private baseUrl: string,
  ) {}

  get<T>(url: string, params?: any): Observable<T> {
    return this.http
      .get<T>(this.baseUrl + url, { params })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  post<T>(url: string, body: any | null): Observable<T> {
    return this.http
      .post<T>(this.baseUrl + url, body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  put<T>(url: string, body: any | null): Observable<T> {
    return this.http
      .put<T>(this.baseUrl + url, body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  delete<T>(url: string, body?: any | null): Observable<T> {
    return this.http
      .delete<T>(this.baseUrl + url, { body })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(response: HttpErrorResponse): Observable<never> {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    const message = error.message || 'An error occurred';
    const status = response.status;

    if (status === 401) {
      // this.router.navigate(['/login']);
      this.router.navigate([RouteTo(ApplicationRoute.Login)]);
    }

    if (key === 'isTrusted') {
      console.log('Server is not responding');
    } else {
      console.log(message);
    }

    return throwError(() => new Error(message));
  }
}

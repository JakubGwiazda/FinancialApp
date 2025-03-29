import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import {
  AuthorizationService,
  StringResult,
} from 'crypto-api/model/authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  constructor(
    private tokenService: TokenStorageService,
    private authorizationService: AuthorizationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/refresh-token')) {
      return from(this.tokenService.getRefreshToken()).pipe(
        switchMap((token) => {
          if (token) {
            const enrichedRequest = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${token}`),
            });
            return next.handle(enrichedRequest);
          }
          return next.handle(request);
        })
      );
    }

    return from(this.tokenService.getToken()).pipe(
      switchMap((token) => {
        if (token) {
          const enrichedRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
          });
          return next.handle(enrichedRequest);
        }
        return next.handle(request);
      }),
      catchError((error) => {
        if (error.status === 401 && !this.isRefreshing) {
          return this.handle401Error(request, next);
        }
        return throwError(() => new Error('An error occurred'));
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    return this.authorizationService.refreshToken().pipe(
      switchMap((newAccessToken: StringResult) => {
        this.tokenService.saveToken(newAccessToken.value!);
        const enrichedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${newAccessToken.value}`,
          },
        });
        this.isRefreshing = false;
        return next.handle(enrichedRequest);
      }),
      catchError(() => {
        this.isRefreshing = false;
        return throwError(() => new Error('Refresh token failed'));
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return (
      next.handle(
        this.authService.isLoggedIn ?
          request.clone({
            setHeaders: {
              'Authorization': `Bearer ${this.authService.token}`
            }
          }) :
          request
      )
    );
  }
}

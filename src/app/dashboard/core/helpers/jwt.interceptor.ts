import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, empty, throwError } from 'rxjs';

import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../services/auth.service';
import { AuthService } from '../guards2/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private authService: AuthService,
        private router : Router,
        private cookieService: CookieService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (environment.defaultauth === 'firebase') {
            // add authorization header with jwt token if available
            let currentUser = this.authenticationService.currentUser();
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
            }
        } else {
            // add authorization header with jwt token if available
            const token =  this.authService.getToken();
            if (token != "") {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.cookieService.delete('token');
              this.router.navigate(['/admin/login']);
              return empty();
            }
            return throwError(error);
          })
        );
    }
}

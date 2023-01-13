import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from './../_auth/auth.service';
import { Observable, from } from 'rxjs';
import { throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
        private router: Router,) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = this.injector.get(AuthService);

        return next.handle(request)
            .pipe(catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        console.log('not auth! get out!', err.error);
                        auth.logout();
                        this.router.navigate(['login']);
                    }

                    if (err.status === 490) {
                        console.log('change pass!', err.error);
                        this.router.navigate(['login']);
                    }
                } 
                return throwError(err);
            })
            );
    }
}

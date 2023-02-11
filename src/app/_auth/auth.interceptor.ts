import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({providedIn:'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
    private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {

    //return next.handle(request);

    console.log('LLEGO');

    const auth = this.injector.get(AuthService);

     /*  let a = auth.isLoggedIn?{
        setHeaders: {
          autorization: auth.authToken!
        }
      }:{};
        let req = request.clone(a); */

        let req = request.clone({
            setHeaders: {
              Authorization: `Bearer ${auth.authToken}`
            }
        });

        return next.handle(req)
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

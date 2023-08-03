import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, Router
} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.cookieService.get('token');
    let req = request;
    if(token){
      req = request.close(update : {
        setHeaders : {
          authorization: `Bearer ${token}`
        }
      })
    }

      return next.handle(req).pipe(
        catchError(selector:(err: HttpErrorResponse) =>{
          
        })
      );
  }

}

import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import {catchError, finalize, switchMap, filter, take} from 'rxjs/operators';
import { Router } from "@angular/router";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  REST_API_SERVER = environment.url_api;
  isRefreshingToken = false;

  constructor(
    private api: ApiService,
    private router : Router,
  ) {}

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler): Observable<HttpEvent<any>> {
     // Check if we need additional token logic or not
     console.log('-- INTERCEPTOR req url ----> ',req.url);
     console.log('-- INTERCEPTOR req headers ----> ',req.headers);
     if (this.isInBlockedList(req.url)) {
       return next.handle(req);
     } else {
         return next.handle(this.addToken(req)).pipe(
           catchError(err => {
             if(err instanceof HttpErrorResponse){
               switch(err.status){
                 case 400:
                   console.log('---------- 400  INTERCEPTOR  logout the user  -------------------');
                 return this.handle400Error(err);
                 case 401:
                   console.log('---------- 401  INTERCEPTOR token expire start token refresh  -------');
                   return this.handle401Error(req, next);
                 default:
                  console.log('---------- INTERCEPTOR default error  -------------------');
                  return throwError(err);
               }
             }else{
              console.log('-- INTERCEPTOR err NOT instanceof HttpErrorResponse  -----------');
              return throwError(err);
             }
           })
         );
     }
 
  }

  // Filter out URLs where you don't want to add the token!
  private isInBlockedList(url: String): Boolean {
      if (url == `${this.REST_API_SERVER}api/auth/signin` || 
          url == `${this.REST_API_SERVER}api/auth/signup` || 
          url == `${this.REST_API_SERVER}api/pwdResetReq` || 
          url == `${this.REST_API_SERVER}api/users/register`) {
      return true;
    } else {
      return false;
    }
  }

   // Add our current access token from the service if present
   private addToken(req: HttpRequest<any>) {
    if (this.api.currentAccessToken) {
      return req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.api.currentAccessToken}`
        })
      });
    } else {
      return req;
    }
  }

  
  // We are not just authorized, we couldn't refresh token
// or something else along the caching went wrong!
private async handle400Error(err:any) {
  // Potentially check the exact error reason for the 400
  // then log out the user automatically

  Swal.fire(
    'Alerta',
    'Logged out due to authentication mismatch ',
    'info'
  )

  // this.apiService.logout();
  var modals = document.getElementsByTagName("ion-modal");
  [].forEach.call(modals, function (el:any) {
      el.parentNode.removeChild(el);
  });
  this.router.navigateByUrl('', { replaceUrl: true });
  return of(null);
}

// Indicates our access token is invalid, try to load a new one
private handle401Error(request: HttpRequest < any >, next: HttpHandler): Observable < any > {
  // Check if another call is already using the refresh logic
  if(!this.isRefreshingToken) {
    // Set to null so other requests will wait
    // until we got a new token!
    this.tokenSubject.next(null);
    this.isRefreshingToken = true;
    this.api.currentAccessToken = null;

    // return next.handle(this.addToken(request));
    // First, get a new access token
    return (this.api.getNewAccessToken()).pipe(
      switchMap((token: any) => {
        if (token) {
          // Store the new token
          const accessToken = token.accessToken;
          this.api.storeAccessToken(token);
          this.tokenSubject.next(accessToken);
          return next.handle(this.addToken(request));
        } else {
          // No new token or other problem occurred
          return of(null);
        }
      }),
      finalize(() => {
        // Unblock the token reload logic when everything is done
        this.isRefreshingToken = false;
      })
    );
  } else {

    // "Queue" other calls while we load a new token
    return this.tokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(_ => {
      // switchMap(token => {
        // Perform the request again now that we got a new token!
        return next.handle(this.addToken(request));
      })
    );
  }
}

}


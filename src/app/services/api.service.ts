import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, firstValueFrom,
  from, of
} from 'rxjs'
import {Router} from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams} from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

const REFRESH_TOKEN_KEY = 'my-refresh-token';
const TOKEN_EXP = 'token-exp';
const TOKEN_IAT = 'token-iat';
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  api_url: string = environment.url_api;
  public currentAccessToken: any;
  REST_API_SERVER = environment.url_api;
  // private http = Inject(HttpClient);

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  // Load accessToken on startup
  async loadToken() {
    const token = await localStorage.getItem('my-token');    
    if (token) {
      
      this.currentAccessToken = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

    // Load the refresh token from storage
  // then attach it as the header for one specific API call
  getNewAccessToken() {
    // const refreshToken = from<string>(localStorage.getItem(REFRESH_TOKEN_KEY));
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`
          })
        }
        return this.http.get(`${this.REST_API_SERVER}api/auth/refresh`, httpOptions);
      } else {
        // No stored refresh token
        var modals = document.getElementsByTagName("ion-modal");
        [].forEach.call(modals, function (el:any) {
            el.parentNode.removeChild(el);
        });
        this.router.navigateByUrl('', { replaceUrl: true });
        return of(null);
      }
  }

    // Store a new access token
    storeAccessToken(token:any) {
      this.currentAccessToken = token.accessToken;
      localStorage.setItem('my-token', token.accessToken);
      localStorage.setItem(TOKEN_IAT,token.iatDate);
      localStorage.setItem(TOKEN_EXP,token.expDate);
      // get new refresh token-------------
      if(token.refreshToken !== '') localStorage.setItem(REFRESH_TOKEN_KEY,token.refreshToken);
  
      return from(this.currentAccessToken);
      // return from(this.storage.set(TOKEN_KEY, accessToken));
    }

  
 getData(collection:string) {
  const token = localStorage.getItem(TOKEN_KEY);
  let  options = {
    headers : {
      'content-type' : 'application/json',
      'authorization' : `Bearer ${token}`,
    }
  }
    return this.http.get(collection ,options);
}

  Login(obj:any) : Observable<any>{
    return this.http.post(this.api_url + '/api/auth/signin',obj);
  }

  register(formValue: any){
    return firstValueFrom(this.http.post(`${this.api_url}/register`, formValue));
  }

    // Potentially perform a logout operation inside your API
  // or simply remove all local tokens and navigate to login
  logout() {
    return this.http.post(`${this.REST_API_SERVER}api/auth/logout`, {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        // Remove all stored tokens
        const deleteAccess = localStorage.removeItem(TOKEN_KEY);
        const deleteRefresh = localStorage.removeItem(REFRESH_TOKEN_KEY);
        return from(Promise.all([deleteAccess, deleteRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/', { replaceUrl: true });
      })
    ).subscribe();
  }


}

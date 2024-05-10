import { Injectable } from '@angular/core';
import { ApiService } from "../services/api.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { tokens } from "../tools/data.model";
import { Router } from "@angular/router";
import { Token } from '@angular/compiler';
// import { JwtHelperService } from "@auth0/angular-jwt";


// #region constants ----------------------------------
// const helper = new JwtHelperService();
const REFRESH_TOKEN_KEY = 'my-refresh-token';
const TOKEN_EXP = 'token-exp';
const TOKEN_IAT = 'token-iat';

const TOKEN_KEY = 'my-token';
const USERID = 'my-userId';
const USER_ROLES = 'my-roles';
const MY_SIM = 'my-sim';
const CORE_SIM = 'my-core-sim';
const USER_ROLE = 'my-role';
const CORE_ID = 'core-id';
const CORE_NAME = 'core-name';
const LOCATION = 'location';
const TWILIO = 'twilio';
const CODE_EXPIRY = 'code_expiry';
const TOKEN_PX = 'token_px';
const LOCKED = 'locked';
const EMAIL_TO_VISITOR = 'emailToVisitor';
const EMAIL_TO_CORE = 'emailToCore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  Tokens: tokens;
  private  REST_API_SERVER = environment.url_api;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken: any;
  userId = '';


  constructor(
    private http: HttpClient,
    private router : Router,
  ) { 
    localStorage.setItem(TWILIO,'false');
    this.loadToken()
  }

  async loadToken() {
    const token = await localStorage.getItem(TOKEN_KEY);

    if (token) {
      this.currentAccessToken = await token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  Login(obj:any): Observable<any>{
    // return this.http.post(this.REST_API_SERVER + 'api/auth/signin',obj )
    return this.http.post(this.REST_API_SERVER + 'api/auth/signin',obj).pipe(
      switchMap(async (tokens:any) =>{
        this.currentAccessToken = await tokens.accessToken;

        this.MyRole(tokens.roles).then(async val_role => {
          localStorage.setItem('my-role',val_role);
        })
        
        localStorage.setItem('my-email',tokens.email);
        localStorage.setItem(TOKEN_PX,tokens.pwd);
        localStorage.setItem(USERID,tokens.userId);
        localStorage.setItem(USER_ROLES,JSON.stringify(tokens.roles));
        localStorage.setItem(CORE_SIM,tokens.core_sim);
        localStorage.setItem(MY_SIM,tokens.sim);
        localStorage.setItem(CORE_ID,tokens.core_id);
        localStorage.setItem(CORE_NAME,tokens.coreName);
        localStorage.setItem(LOCATION,tokens.location);
        localStorage.setItem(TWILIO,'false');
        localStorage.setItem(CODE_EXPIRY,tokens.code_expiry);

        localStorage.setItem(TOKEN_IAT,tokens.iatDate);
        localStorage.setItem(TOKEN_EXP,tokens.expDate);
        localStorage.setItem(LOCKED,tokens.locked);
        localStorage.setItem(EMAIL_TO_VISITOR, 'true');
        localStorage.setItem(EMAIL_TO_CORE, 'true');

        const storeAccess = localStorage.setItem(TOKEN_KEY,tokens.accessToken);
        const storeRefresh = localStorage.setItem(REFRESH_TOKEN_KEY,tokens.refreshToken);
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  async MyRole(roles: any[]){
    //--- check for admin role
    let myrole = '';
    if(await roles.find((role: { name: string; }) => role.name.toLowerCase() === 'admin')){
      myrole = 'admin'
    }else if(await roles.find((role: { name: string; }) => role.name.toLowerCase() === 'supervisor')){
      myrole = 'supervisor'
    }else if(await roles.find((role: { name: string; }) => role.name.toLowerCase() === 'neighboradmin')){
      myrole = 'neighborAdmin'
    }else if(await roles.find((role: { name: string; }) => role.name.toLowerCase() === 'neighbor')){
      myrole = 'neighbor'
    }else if(await roles.find((role: { name: string; }) => role.name.toLowerCase() === 'relative')){
      myrole = 'relative'
    }else if(await roles.find((role: { name: string; }) => role.name.toLowerCase() === 'visitor')){
      myrole = 'visitor'
    }

    return await myrole;
  }

}

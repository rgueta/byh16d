import { Injectable } from '@angular/core';
import { ApiService } from "../services/api.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  REST_API_SERVER = environment.url_api;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  onLogin(obj:any): Observable<any>{
    return this.http.post(this.REST_API_SERVER + '/api/auth/signin',obj )
  }

}

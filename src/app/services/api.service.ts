import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, firstValueFrom} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url: string = environment.url_api;
  private http = Inject(HttpClient);
  REST_API_SERVER = environment.url_api;

  constructor() { }

  
 getData(collection:String) {
  // const token = localStorage.getItem(TOKEN_KEY);
  let  options = {
    headers : {
  'content-type' : 'application/json',
  }
  }
    return this.http.get(this.REST_API_SERVER + collection ,options);
}

  onLogin(obj:any) : Observable<any>{
    return this.http.post(this.api_url + '/api/auth/signin',obj);
  }

  register(formValue: any){
    return firstValueFrom(this.http.post(`${this.api_url}/register`, formValue));
  }

}

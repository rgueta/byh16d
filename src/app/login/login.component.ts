import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAndroid:any;
  credentials: FormGroup;
  logged: boolean = false;

  constructor(private apiService: ApiService,
              private api: HttpClient){}

  // Easy access for form fields
 get email() {
   return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('pwd');
  }




  async ngOnInit(){
    this.credentials = new FormGroup({
      email: new FormControl('neighbor2@gmail.com', [Validators.required, Validators.email]),
      pwd: new FormControl('1234', [Validators.required, Validators.minLength(4)]),
    });
  }

  loginObj: any ={
    userName: '',
    password: ''
  };

  onLogin(){
    // this.accService.onLogin(this.loginObj).subscribe((res: any) =>{
    //   console.log('res --> ', res);
    //
    // });
  }

  login(){

  }

  pwdReset(){

  }

  openStore(){}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAndroid:any;
  credentials: FormGroup;
  logged: boolean = false;

  constructor(private auth: AuthService){}

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
    this.auth.onLogin(this.credentials.value).subscribe(
      async res =>{
        const roles =  res;
        
        console.log('Return --> ',roles)
      },
      async err =>{
        Swal.fire(
          'Alerta',
          'Error login: ' + JSON.stringify(err),
          'info'
        )
      }
    )
  }

  pwdReset(){

  }

  openStore(){}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAndroid:any;
  credentials: FormGroup;
  logged: boolean = false;

  constructor(
    private auth: AuthService,
    private router : Router,
  ){}

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


  login(){
    this.auth.Login(this.credentials.value).subscribe(
      async res =>{
        const roles =  res;
        console.log('Return --> ',roles);
        // for(const val_myrole of JSON.parse(roles)){
        //   if(localStorage.getItem('locked') === 'true')
        //   {
        //     await this.showAlert('Alerta','Usuario bloqueado !','info');
        //     return;
        //   }
        // };
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
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

  async showAlert(header:string,msg:string,icon:any){
    Swal.fire(
      header,
      msg,
      icon
    )
  }

  pwdReset(){

  }

  openStore(){}

}

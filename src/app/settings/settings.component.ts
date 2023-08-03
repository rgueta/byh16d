import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName }
  from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  openedModal:boolean = false;
  register: FormGroup;
  image:string = '../assets/user.png';
  list_roles: any = [];

  constructor(private api: ApiService) {

  }

// #region get form controls 
  get name() {
    return this.register.get('name');
  }

  get username() {
    return this.register.get('username');
  }

  get email() {
    return this.register.get('email');
  }

  get pwd() {
    return this.register.get('pwd');
  }

  get sim() {
    return this.register.get('sim');
  }

  get gender() {
    return this.register.get('gender');
  }

  get avatar() {
    return this.register.get('avatar');
  }

  get roles() {
    return this.register.get('roles');
  }

//#endregion
  
ngOnInit(): void {

    this.register = new FormGroup({
      name: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      pwd: new FormControl('',[Validators.required,Validators.minLength(4)]),
      sim: new FormControl('',[Validators.required,Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}")]),
      gender: new FormControl('',[Validators.required]),
      avatar: new FormControl(''),
      roles: new FormControl('',[Validators.required])
    })

    this.getRoles();
  }

  async getRoles(){
     await this.api.getData('/api/roles').subscribe(async (data:any) => {
      this.list_roles = data;
      console.log('list_roles -->', this.list_roles);
    });
    
  }

  openRegister(){
    this.openedModal = true;
  }

  async onFileSelected(event:any){
    let base64: any = '';

    const img = new Image;
    img.src = base64;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      base64 = reader.result;
      this.register.controls['avatar'].setValue(base64);
      console.log(base64);
      this.image = base64;
    };

  }

  onChangeGender(event:any){
  }

  onChangeRoles(event:any){
    console.log('role --> ',event.target.value);
  }

  async Register(){
    const response = await this.api.register(this.register.value);
    console.log('response --> ', response);
    // console.log('response --> ', this.register.value);
  }

  async Config(){}

  closeModal(){
    this.openedModal = false;
  }

}

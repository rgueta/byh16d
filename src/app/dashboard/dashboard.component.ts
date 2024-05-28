import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "../animations";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Utils } from "../tools/tools";
import { ApiService } from "../services/api.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [DropDownAnimation]
})
export class DashboardComponent implements OnInit {
  openedModal:boolean = false;

  searchTxt:any;
  isMenuOpened:boolean = false;
  list: any = [];
  listEvents: any = [];
  api: string = environment.url_api;
  intervalVar: any;
  ActiveCodes: number = 0;
  codeEvents : number = 0;
  countCodes : number = 0;
  codeFilter: string = '';

  constructor(
    private http :HttpClient,
    private router : Router,
    private apiService: ApiService
  ) { }

  ngOnInit(){
  //Interval ----------------------
  if(environment.interval_call_api){
    this.intervalVar = setInterval(()=>{
      this.getCodes();
      console.log('call API ------', new Date());
    },environment.timer_call_api);
  }

   this.getCodes();

  }

  getCodes(){
    const today = new Date();
    let index:number = 0;
    this.apiService.getData(this.api + 'api/codes/visitors_dashboard/' +
      localStorage.getItem('my-userId')
    )
    .subscribe((data:any) =>{
      this.list = data.codes;
      this.codeEvents = data.countEvents;
      this.countCodes = data.countCodes;
      this.list.forEach((element:any) => {
        index = index + 1 ;
        element.idx = index;
        if(new Date(element.expiry) > today){
          this.ActiveCodes ++;
          element.expiro = false;
        }
        else{
          element.expiro = true;
        }
      });
    },
  (error:any) =>{
    console.log('error: ', error)
  }
  );
  }

  getCodeEvents(){
      this.http.get(this.api + 'api/codeEvent/code/' + this.codeFilter).subscribe(async (data:any) =>{
        this.listEvents = await data;
        console.log('length --> ',this.listEvents.length);
        if(this.listEvents.length == 0){
          this.openedModal = false;
          this.showAlert('Consulta de eventos',
            'No hay eventos para el codido: ' + this.codeFilter,
            'info')
        }else{
          this.openedModal = true;
        }
      });
  }


  toggleMenu(){
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(){
    this.isMenuOpened = false;
  }

  logout(){
    this.isMenuOpened = false;
    Swal.fire({
      text: "Deseas salir ?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then( async (result) => {
      if (result.isConfirmed) {
        await this.apiService.logout();
        this.router.navigateByUrl('', { replaceUrl: true });
        Utils.cleanLocalStorage();
      } else if (result.isDenied) {
        console.log('mantener')
      }
    });
  }

  async showAlert(header:string,msg:string,icon:any){
    Swal.fire(
      header,
      msg,
      icon
    )
  }
  openModal(code:string){
    this.codeFilter = code;
    this.getCodeEvents();
  }

  closeModal(){
    this.openedModal = false;
  }

}

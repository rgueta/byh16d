import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "../animations";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit {

  searchTxt:any;
  isMenuOpened:boolean = false;
  list: any = [];
  api: string = environment.url_api;
  intervalVar: any;
  ActiveCodes: number = 0;
  codeEvents : number = 0;

  constructor(
    private http :HttpClient,
    private apiService:ApiService,
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
   this.getCountEvents();

  }

  getCodes(){
    const today = new Date();
    let index:number = 0;
    this.apiService.getData(this.api + 'api/codes/' + 
      localStorage.getItem('my-userId')
    ).subscribe((data) =>{
      this.list = data;
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
    });
  }

  getCountEvents(){
     this.apiService.getData(this.api + 'api/codeEvent/count/all/' + 
      localStorage.getItem('my-userId')
     ).subscribe((data:any) =>{
      this.codeEvents  = data.count;
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
  }


}

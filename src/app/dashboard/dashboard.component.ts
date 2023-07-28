import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "../animations";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

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

  constructor(private http :HttpClient) { }

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
    this.http.get(this.api + '/api/codes/visitors_dashboard/').subscribe((data:any) =>{
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
    });
  }

  getCodeEvents(){

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


  openModal(){
    this.openedModal = true;
  }

  closeModal(){
    this.openedModal = false;
  }

}

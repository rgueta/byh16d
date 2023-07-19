import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "../animations";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [DropDownAnimation]
})
export class DashboardComponent implements OnInit {
  isMenuOpened:boolean = false;
  list: any = [];

  constructor(
    private http :HttpClient
  ) { }

  ngOnInit(){
   this.getCodes();
  }

  getCodes(){
    this.http.get('http://192.168.1.185:5000/api/codes/').subscribe((data) =>{
     this.list = data;
      this.list.forEach((element:any) => {
        let comp = (this.compareDates(new Date(element.expiry),new Date()));
        if(comp = 1){
          this.list[0].expiro = false;
        }else{
          this.list[0].expiro = true;
        }
      });
    });

    console.table(this.list);
  }

  compareDates = (a: Date, b: Date): number => {
    if (a < b) return -1;
    if (a > b) return +1;
  
    return 0; // dates are equal
  };

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

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
    let today = new Date().toISOString();
    console.log('Now -->', today)
    this.http.get('http://192.168.1.185:5000/api/codes/').subscribe((data) =>{
     this.list = data;
      this.list.forEach((element:any) => {
        console.log('expiry ->',element.expiry)
        if(element.expiry > today){
          console.log('Si expiro')
          this.list[0].expiro = true;
          
        }else{
          this.list[0].expiro = false;
        }
      });

      // this.list =  data;
    });

    console.table(this.list);
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

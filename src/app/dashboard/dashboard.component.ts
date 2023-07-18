import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "../animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [DropDownAnimation]
})
export class DashboardComponent implements OnInit {
  isMenuOpened:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(){
    this.isMenuOpened = false;
  }

  logout(){
    console.log('logout cocked')
  }

}

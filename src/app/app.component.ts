import { Component } from '@angular/core';
import { SocketIoService } from "./services/socket-io.service";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'byh16d';

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private socketSrv: SocketIoService
  ){

    this.socketSrv.listenToServer('codeEvent').subscribe((data) =>{
      this.onCodeEvent(data)
    });

    this.socketSrv.listenToServer('codes').subscribe((data) =>{

    });

  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  onCodeEvent(codeEvent:any){
    console.log('codeEvents -->\n', codeEvent)
  }

}

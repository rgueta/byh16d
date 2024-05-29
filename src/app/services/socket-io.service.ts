import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import * as io from "socket.io-client";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  api: string = environment.url_api;
  socket : any = undefined;

  constructor() { 
    this.socket = io.connect(this.api)
  }

  listenToServer(event:string): Observable<any>{
    return new Observable((subscribe) => {
      this.socket.on(event, (data) => {
        subscribe.next(data);
      });
    });
  }

  emitToServer(event:string):void {
    this.socket.emit(event)
  }
}

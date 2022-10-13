import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

const BACKENT_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  constructor() { }

  initSocket(){
    this.socket = io(BACKENT_URL);
    return ()=>{this.socket.disconnetc();}
  }

  send(message: string){
    this.socket.emit('message', message)
  }

  getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data: any)=>{observer.next(data)
      });
    });
  }
  joinchannel(data:any):void{
    this.socket.emit("joinchannel",data);
  }
  leavechannel(data:any):void{
    this.socket.emit("leavechannel",data);
  }
  joined(next:any){
    this.socket.on('joined',(res: any)=>next(res));
  }
  notice(next:any){
    this.socket.on('notice',(res:any)=>next(res));
  }

}

import { Component, OnInit } from '@angular/core';
import* as io from 'socket.io-client';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username = sessionStorage.getItem('username');
  birthdate = sessionStorage.getItem('birthdate');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');
  valid = sessionStorage.getItem('valid');

  messagecontent  : string = '';
  errorMassage: string = '';
  messages:string[] = [];

  ioConnection:any;

  constructor(private socketService:SocketService){}
  // constructor() { 
  //   this.socket = io(this.url);
  //   this.socket.on('new-messages':m=>{alert(m);});
  // }

  ngOnInit(): void {
    this.initIoConnection();
  }
  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
      .subscribe((message:any)=>{
      this.messages.push(message);
    });
  }

  chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = '';
    }else{
      console.log('no message');
    }
  }
}

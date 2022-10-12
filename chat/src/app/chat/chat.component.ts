import { Component, OnInit } from '@angular/core';
import* as io from 'socket.io-client';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentGroup = JSON.parse(localStorage.getItem('targetGroup')!);
  username = localStorage.getItem('username');
  birthdate = localStorage.getItem('birthdate');
  age = localStorage.getItem('age');
  email = localStorage.getItem('email');
  valid = localStorage.getItem('valid');

  messagecontent  : string = '';
  errorMassage: string = '';
  messages:string[] = [];
  roomnotice:string="";
  currentChannel = JSON.parse(localStorage.getItem('targetChannel')!);
  ioConnection:any;

  constructor(private socketService:SocketService, private router:Router){}
  // constructor() { 
  //   this.socket = io(this.url);
  //   this.socket.on('new-messages':m=>{alert(m);});
  // }

  ngOnInit(): void {
    this.initIoConnection();
  }
  private initIoConnection(){
    this.socketService.initSocket();
    this.socketService.joinchannel([this.username, this.currentChannel.id]);

    this.ioConnection = this.socketService.getMessage()
      .subscribe((message:any)=>{
      this.messages.push(message);
    });
    this.socketService.notice((message: any)=>{
      this.roomnotice=message
    });
    this.socketService.joined((message: any)=>{
      this.currentChannel =message
    });
  }
  clearnotice(){
    this.roomnotice = "";
  }
  chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = '';
    }else{
      console.log('no message');
    }
  }
  back(){
    
    this.router.navigateByUrl('/group/' + this.currentGroup.id + '/channels');

  }

}

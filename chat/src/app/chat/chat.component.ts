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
  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  valid = this.currentUser.valid;
  userid = this.currentUser.user[0].id;
  username = this.currentUser.user[0].name;
  role = this.currentUser.user[0].role;
  email = this.currentUser.user[0].email;

  messagecontent  : string = '';
  errorMassage: string = '';
  messages:string[] = [];
  roomnotice:string="";
  currentChannel = JSON.parse(localStorage.getItem('targetChannel')!);
    // currentChannel = JSON.parse(localStorage.getItem('targetChannel')!);

  ioConnection:any;

  constructor(private socketService:SocketService, private router:Router){}
  // constructor() { 
  //   this.socket = io(this.url);
  //   this.socket.on('new-messages':m=>{alert(m);});
  // }

  ngOnInit(): void {
    this.initIoConnection();
    console.log(this.username)

  }
  private initIoConnection(){
    this.socketService.initSocket();
    this.currentChannel = JSON.parse(localStorage.getItem('targetChannel')!);

    this.socketService.joinchannel({name: this.username, channel: this.currentChannel.id});

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
    // console.log(this.username)
    if(this.messagecontent){
      let sendingMessage = this.username + ' says: ' + this.messagecontent
      this.socketService.send(sendingMessage);
      this.messagecontent = '';
    }else{
      console.log('no message');
    }
  }
  back(){
    this.socketService.leavechannel({name: this.username, channel: this.currentChannel.id});
    this.messagecontent = '';
    this.errorMassage = '';
    this.messages = [];
    this.roomnotice="";
    this.router.navigateByUrl('/group/' + this.currentGroup.id + '/channels');

  }

}

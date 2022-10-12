import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
// for angular http methods
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  valid = this.currentUser.valid;
  userid = this.currentUser.user[0].id;
  username = this.currentUser.user[0].name;
  role = this.currentUser.user[0].role;
  email = this.currentUser.user[0].email;
  // group
  _id = undefined;
  id = undefined;
  groupadmin: String[] = [];
  groupassis: String[] = [];
  groupusers: String[] = [];
  channelsSession = localStorage.getItem('channels')!;
  channels = JSON.parse(this.channelsSession);

  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.init();
    this.getChannels();
  }
  init(){
    let targetgroup = JSON.parse(localStorage.getItem('targetGroup')!);
    this._id = targetgroup._id;
    this.id = targetgroup.id;
    this.groupadmin = targetgroup.groupadmin;
    this.groupassis = targetgroup.groupassis;
    this.groupusers = targetgroup.groupusers;
  }
  getChannels(){
    let query = {"_id":this._id,"id":this.id,"groupusers": this.groupusers,"groupassis":this.groupassis,"groupadmin":this.groupadmin};
    this.httpClient.post(BACKEND_URL + '/api/getChannels', query).subscribe((data: any) => {
      // alert(JSON.stringify(data));
      console.log(data)
      console.log(JSON.stringify(data))
      localStorage.setItem('channels', JSON.stringify(data));
      this.channels=data;
      console.log(this.channels)
      // localStorage.setItem('extendedUserArray', JSON.stringify(data));

    });
  }

  create(){
    let newChannel = {'id':undefined, 'groupid': this.id, 'channelusers': []}
    console.log(newChannel);
    this.httpClient.post(BACKEND_URL + '/api/createChannel', newChannel,  httpOptions)
      .subscribe((data: any) => {
        if(data.ok){
          // localStorage.setItem('extendedUserArray', JSON.stringify(data.uArray));
          alert(JSON.stringify(data.message));
          setTimeout(this.refreshWindow, 1000);
          // this.router.navigateByUrl("/group");
        } else {
          alert('failed: ' + JSON.stringify(data.message));
        }
    });
  }
  delete(targetChannel: any){
    
    console.log(targetChannel);
    this.httpClient.post(BACKEND_URL + '/api/deleteChannel', targetChannel,  httpOptions)
      .subscribe((data: any) => {
        // alert(JSON.stringify(data));
        console.log(data)
        localStorage.setItem('channels', JSON.stringify(data));
    });
    setTimeout(this.refreshWindow, 500);
  }
  edit(targetChannel:any){
    localStorage.setItem('targetChannel', JSON.stringify(targetChannel));
    let channelID = targetChannel.id
    this.router.navigateByUrl('/group/' + this.id + '/update-channels/' + channelID);
  }
  chat(targetChannel:any){

    // localStorage.setItem('targetChannel', JSON.stringify(targetChannel));
    // let channelID = targetChannel.id
    // this.router.navigateByUrl('/chat/' + this.username);


    console.log(targetChannel)
    localStorage.setItem('targetChannel', JSON.stringify(targetChannel));
    let channelID = targetChannel.id
    this.router.navigateByUrl('/group/' + this.id + '/channels/' + channelID + '/chat/'+this.username);

    // }else {
    //   alert('user not valid')
    // }
  }
  back(){
    this.router.navigateByUrl('/group');
  }
  refreshWindow(){
    window.location.reload();
  }
  
}

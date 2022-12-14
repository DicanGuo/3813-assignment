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
  valid = localStorage.getItem('valid');
  username = localStorage.getItem('username');
  userid = localStorage.getItem('userid');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  groupsSession = localStorage.getItem('groupsSession')!;
  groups = JSON.parse(this.groupsSession);
  extendedUserArraySession = localStorage.getItem('extendedUserArray')!;
  extendedUserArray = JSON.parse(this.extendedUserArraySession);

  channelSession = localStorage.getItem('channelSession')!;
  channels = JSON.parse(this.channelSession);
  addUser = '';
  targetGroup = [];
  deleteUser = '';
  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  createChannel(group:any){
    // let user = {role:this.role};
    this.httpClient.post(BACKEND_URL + '/createchannel', group,  httpOptions).subscribe((data:any)=>{
      console.log(data);
      if(data.ok){
        alert(JSON.stringify(data.message));

        localStorage.setItem('channelSession', JSON.stringify(data.cArray));
            // reload page to show data
        this.router.navigateByUrl('/channels')
        .then(()=>{window.location.reload();});
          }
    });

  }
  deleteChannel(group:any, channel:any){
    let postData = {group, channel};
    console.log(postData)
    this.httpClient.post(BACKEND_URL + '/deletechannel', postData,  httpOptions).subscribe((data:any)=>{
      if(data.ok){
        console.log(data)
        alert(JSON.stringify(data.message));

        localStorage.setItem('channelSession', JSON.stringify(data.cArray));
            // reload page to show data
        this.router.navigateByUrl('/channels')
        .then(()=>{window.location.reload();});
          }
    });
  }
  updateChannel(channel:any){
    let addUser = this.addUser;
    let postData = {addUser, channel};
    console.log('posting: '+JSON.stringify(postData))
    this.httpClient.post(BACKEND_URL + '/updatechannel', postData,  httpOptions).subscribe((data:any)=>{
      if(data.ok){
        console.log('return: '+ data);
        alert(JSON.stringify(data.message));
        localStorage.setItem('channelSession', JSON.stringify(data.cArray));
        window.location.reload();
      } else {
        alert(JSON.stringify(data.message))
        window.location.reload();

      }
    });
  }

  removeFromChannel(user:any, channel:any){
    let deleteUser = user;
    let postData = {deleteUser, channel};
    console.log('posting: '+JSON.stringify(postData))
    this.httpClient.post(BACKEND_URL + '/removeFromChannel', postData,  httpOptions).subscribe((data:any)=>{
      if(data.ok){
        console.log('return: '+ data);
        // alert(JSON.stringify(data.message));
        // localStorage.setItem('channelSession', JSON.stringify(data.cArray));
        window.location.reload();
      } else {
        alert(JSON.stringify(data.message))
        // window.location.reload();

      }
    });
  }

  chat(){
    console.log(this.username)
    if (this.valid){
      this.router.navigateByUrl('/chat/' + this.username);

    }else {
      alert('user not valid')
    }

  }
}

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

  targetGroup = [];
  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  createChannel(group:any){
    let user = {role:this.role};
    this.httpClient.post(BACKEND_URL + '/channel', user,  httpOptions).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem('channelSession', JSON.stringify(data));
    });
    // reload page to show data
    this.router.navigateByUrl('/channels')
    // .then(()=>{window.location.reload();});
  }
}

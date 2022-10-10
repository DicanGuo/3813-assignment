import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
// for angular http methods

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private route: ActivatedRoute, private router:Router, private httpClient: HttpClient) { }

  title = 'chat';
  // valid = localStorage.getItem('valid');
  // username = localStorage.getItem('username');
  // userid = localStorage.getItem('userid');
  // role = localStorage.getItem('role');
  // email = localStorage.getItem('email');
  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  valid : boolean = false;
  userid = '';
  username = '';
  role = '';
  email = '';
  ngOnInit(): void {
    // console.log(this.currentUser!.valid)
    // console.log(this.valid)
    try {this.init()}
    catch{}
  }

  init(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.valid = this.currentUser.valid;
    this.userid = this.currentUser.user[0].id;
    this.username = this.currentUser.user[0].name;
    this.role = this.currentUser.user[0].role;
    this.email = this.currentUser.user[0].email;
    // console.log(this.currentUser.user[0]['name'])
  }

  logout(){
    localStorage.clear();
    console.log(localStorage);
    this.router.navigateByUrl('/home').then(()=>{
      window.location.reload();
    })
  }
  group(){
    setTimeout(this.refreshWindow, 500);
    this.router.navigateByUrl('/group');
  }

  user(){
    setTimeout(this.refreshWindow, 500);
    this.router.navigateByUrl('/users');
  }

  // channel(){
  //   let user = {role:this.role};
  //   this.httpClient.post(BACKEND_URL + '/channel', user,  httpOptions).subscribe((data:any)=>{
  //     console.log(data);
  //     localStorage.setItem('channelSession', JSON.stringify(data));
  //   });
  //   // reload page to show data
  //   // .then(()=>{window.location.reload();});
  //   this.httpClient.post(BACKEND_URL + '/group', user,  httpOptions).subscribe((data:any)=>{
  //     console.log(data);
  //     localStorage.setItem('groupsSession', JSON.stringify(data));
  //   });
  //   setTimeout(this.refreshWindow, 500);
  //   this.router.navigateByUrl('/channels');

  // };

  refreshWindow(){
    window.location.reload();
  };

  
}

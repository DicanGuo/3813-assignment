import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
// for angular http methods
var valid = false;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  valid : boolean = false;
  userid = '';
  username = '';
  role = '';
  email = '';

  // groupsSession = localStorage.getItem('groupsSession')!;
  // groups = JSON.parse(this.groupsSession);

  constructor(private route: ActivatedRoute, private router:Router, private httpClient: HttpClient) { }

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

  chat(){
    console.log(this.username)
    if (this.valid){
      this.router.navigateByUrl('/chat/' + this.username);

    }else {
      alert('user not valid')
    }

  }
  test(){
    let user = {role:this.role};
    this.httpClient.post(BACKEND_URL + '/group', user,  httpOptions).subscribe((data:any)=>{
      console.log(data);})
  }
  group(){
    // reload page to show data
    setTimeout(this.refreshWindow, 500);
    this.router.navigateByUrl('/group');
  }

  user(){
    setTimeout(this.refreshWindow, 500);
    this.router.navigateByUrl('/users');
  }

  refreshWindow(){
    window.location.reload();
  };

}

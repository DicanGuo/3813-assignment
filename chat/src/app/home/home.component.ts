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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  valid = sessionStorage.getItem('valid');
  username = sessionStorage.getItem('username');
  userid = sessionStorage.getItem('userid');
  role = sessionStorage.getItem('role');
  email = sessionStorage.getItem('email');
  groupsSession = sessionStorage.getItem('groupsSession')!;
  groups = JSON.parse(this.groupsSession);

  constructor(private route: ActivatedRoute, private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {

  }
  logout(){
    sessionStorage.clear();
    console.log(sessionStorage);
    this.router.navigateByUrl('/login');
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
    this.router.navigateByUrl('/group');
  }

}

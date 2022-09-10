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
  valid = localStorage.getItem('valid');
  username = localStorage.getItem('username');
  userid = localStorage.getItem('userid');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  // groupsSession = localStorage.getItem('groupsSession')!;
  // groups = JSON.parse(this.groupsSession);

  constructor(private route: ActivatedRoute, private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {

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
    let user = {role:this.role};
    this.httpClient.post(BACKEND_URL + '/group', user,  httpOptions).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem('groupsSession', JSON.stringify(data));
    });
    // reload page to show data
    this.router.navigateByUrl('/group').then(()=>{
      window.location.reload();
    });
  }

}

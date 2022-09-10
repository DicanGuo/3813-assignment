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
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  valid = localStorage.getItem('valid');
  username = localStorage.getItem('username');
  userid = localStorage.getItem('userid');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  groupsSession = localStorage.getItem('groupsSession')!;
  groups = JSON.parse(this.groupsSession);
  extendedUserArraySession = localStorage.getItem('extendedUserArray')!;
  extendedUserArray = JSON.parse(this.extendedUserArraySession);

  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  test(){
    console.log(this.groups)

  }

  delete(target: any){
    console.log(target);
    this.httpClient.post(BACKEND_URL + '/deletegroup', target,  httpOptions)
    // this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      // alert("posting: " +JSON.stringify(user));
      console.log(data);
      // alert("postRes: " +JSON.stringify(data));

      if (data.ok){
          console.log('ok')
          localStorage.setItem('groupsSession', JSON.stringify(data.gArray));
          alert(JSON.stringify(data.message));
          window.location.reload();
      }
      else { alert(data.message);}
    })
  }
}

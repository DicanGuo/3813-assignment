import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/router';
import { NgForm } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  username = '';
  email = '';
  userid = null;
  role ='';
  password='';
  // newUser = {username: '', email: ''}

  constructor(private router:Router, private httpClient: HttpClient ) { 

  }
  ngOnInit(): void {
  }
  create(){
    let newUser = {'id':'', 'name': this.username, 'password':this.password, 'role': 'user', 'email': ''}
    // console.log(newUser);
    this.httpClient.post(BACKEND_URL + '/api/createUser', newUser,  httpOptions)
      .subscribe((data: any) => {
        alert(JSON.stringify(data));
        console.log(data)
        if(data.ok){
          localStorage.setItem('extendedUserArray', JSON.stringify(data.uArray));
          alert(JSON.stringify(data.message));
          this.router.navigateByUrl("/users");
        } else {
          alert('failed: ' + JSON.stringify(data.message));
        }
      });
      // this.router.navigateByUrl("/users").then(()=>{
      //   window.location.reload();
      // })
  };
}

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  email: string = '';
  // errorMassage = "User credential not match";
  errorMassage = "";
  password = '';

  user = {'username': '', 'email': ''}
  // constructor(private router:Router, private httpClient: HttpClient) { }

constructor(private router:Router, private httpClient: HttpClient ){}

  ngOnInit(): void {
  }
  login(){
    console.log('user inputs:', this.username, this.email);
    console.log('login clicked');

    let userLogin = {'username': this.username, 'email': this.email}
    this.httpClient.post(BACKEND_URL + '/api/login', userLogin).subscribe((data: any)=>{
      console.log('retured data: ' + data)
      console.log('retured data: ' + data.userinfo.valid)

      // console.log('username: ' + data.username)
      // console.log('valid: ' + data.valid)
      // console.log('email: ' + data.email)
      // console.log('id: ' + data.id)
      // console.log('role: ' + data.role)



      // console.log(sessionStorage)

      // alert(JSON.stringify(this.email));
      if (data.userinfo.valid) {
        //user info
        sessionStorage.setItem('username', data.userinfo.username);
        sessionStorage.setItem('email', data.userinfo.email);
        sessionStorage.setItem('id', data.userinfo.id);
        sessionStorage.setItem('valid', data.userinfo.valid);
        sessionStorage.setItem('role', data.userinfo.role);
        //groups
        sessionStorage.setItem('groupsSession', JSON.stringify(data.groupinfo));
        sessionStorage.setItem('userinfo', JSON.stringify(data.userinfo));
        sessionStorage.setItem('allUser', JSON.stringify(data.allUser));


        // console.log('valid user' + sessionStorage['groupSession']['groups']);
        // this.router.navigateByUrl('/chat/' + this.username);
        this.router.navigateByUrl('/home');

      } else { alert("username or email incorrect");}
    }
    );
    
  }
 
  submit(){
    let user = {username:this.username, email: this.email};
    this.httpClient.post(BACKEND_URL + '/login', user,  httpOptions)
    // this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      // alert("posting: " +JSON.stringify(user));

      // alert("postRes: " +JSON.stringify(data));

      if (data.ok){
        sessionStorage.setItem('valid', 'true');
        sessionStorage.setItem('userid', data.userid.toString());
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('role', data.role);

        sessionStorage.setItem('allUser', JSON.stringify(data.allUser));

        this.router.navigateByUrl("/home");
      } else if (data.userData.ok){
        sessionStorage.setItem('valid', 'true');
        sessionStorage.setItem('userid', data.userData.userid.toString());
        sessionStorage.setItem('username', data.userData.username);
        sessionStorage.setItem('email', data.userData.email);
        sessionStorage.setItem('role', data.userData.role);

        sessionStorage.setItem('userArray', JSON.stringify(data.userArray));

        this.router.navigateByUrl("/home");
      }
      else { alert("email or password incorrect");}
    })
  }
}

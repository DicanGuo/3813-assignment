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
      console.log(data)
      console.log('username: ' + data.username)
      console.log('valid: ' + data.valid)
      console.log('email: ' + data.email)
      console.log('id: ' + data.id)
      console.log('role: ' + data.role)



      // console.log(sessionStorage)

      // alert(JSON.stringify(this.email));
      if (data.valid) {
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('birthdate', data.birthdate);
        sessionStorage.setItem('age', data.age);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('valid', data.valid);
        sessionStorage.setItem('role', data.role);
        console.log('valid user' + sessionStorage);
        this.router.navigateByUrl('/chat/' + this.username);
        // this.router.navigateByUrl('/home');

      } else { alert("username or email incorrect");}
    }
    );
    
  }
}

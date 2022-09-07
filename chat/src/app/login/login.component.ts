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
  userid: string = '';
  password: string = '';
  // errorMassage = "User credential not match";
  errorMassage = "";
  
  user = {'userid': '', 'password': ''}
  // constructor(private router:Router, private httpClient: HttpClient) { }

constructor(private router:Router, private httpClient: HttpClient ){}

  ngOnInit(): void {
  }
  login(){
    console.log('user inputs:', this.userid, this.password);
    console.log('login clicked');

    // let user = {'username': this.userid, 'password': this.password, 'birthdate': null, 'age':null,'email':null, 'valid':false}
    // console.log('default value:' + user);

    // this.httpClient.post(BACKEND_URL + '/api/login', user,  httpOptions).subscribe((data:any)=>{
    // this.httpClient.post(BACKEND_URL + '/api/login', user).subscribe(res=>
    //   {console.log(res);},);

    let userLogin = {'username': this.userid, 'password': this.password}
    this.httpClient.post(BACKEND_URL + '/api/login', userLogin).subscribe((data: any)=>{
      console.log(data)
      console.log(data.username)
      console.log(data.password)
      console.log(data.valid)

      console.log(data.email)
      console.log(data.age)


      // console.log(sessionStorage)

      // alert(JSON.stringify(this.password));
      if (data.valid) {
        sessionStorage.setItem('username', this.userid);
        sessionStorage.setItem('birthdate', data.birthdate);
        sessionStorage.setItem('age', data.age);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('valid', data.valid);
        console.log('valid user' + sessionStorage);
        this.router.navigateByUrl('/chat/' + this.userid);

      } else { alert("email or password incorrect");}
    }
    );
    
  }
}

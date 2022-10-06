import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
const MONGO_URL = '';
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
  ok = false;

  user = {'username': '', 'email': ''}
  // constructor(private router:Router, private httpClient: HttpClient) { }

constructor(private router:Router, private httpClient: HttpClient ){}

  ngOnInit(): void {
  }

  submit(){
    let user = {username:this.username, email: this.email};
    this.httpClient.post(BACKEND_URL + '/login', user,  httpOptions)
    // this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      // alert("posting: " +JSON.stringify(user));

      // alert("postRes: " +JSON.stringify(data));
      console.log(data.ok)
      if (data.ok == false) { alert("email or password incorrect");
    }
      else if (data.ok){
        localStorage.setItem('valid', 'true');
        localStorage.setItem('userid', data.userid.toString());
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        this.router.navigateByUrl("/home");
      } else if (data.userData.ok){
        localStorage.setItem('valid', 'true');
        localStorage.setItem('userid', data.userData.userid.toString());
        localStorage.setItem('username', data.userData.username);
        localStorage.setItem('email', data.userData.email);
        localStorage.setItem('role', data.userData.role);

        localStorage.setItem('userArray', JSON.stringify(data.userArray));
        localStorage.setItem('extendedUserArray', JSON.stringify(data.extendedUserArray));

        this.router.navigateByUrl("/home").then(()=>{
          window.location.reload();
        })
      } 
    })
  }

  // submit(){
  //   let user = {username:this.username, email: this.email};
  //   this.httpClient.post(BACKEND_URL + '/api/auth', user,  httpOptions)
  //   // this.httpClient.post(BACKEND_URL + '/login', user)
  //   .subscribe((data:any)=>{
  //     console.log(data)
  //     // alert("posting: " +JSON.stringify(user));

  //     // alert("postRes: " +JSON.stringify(data));
  //   //   console.log(data.ok)
  //   //   if (data.ok == false) { alert("email or password incorrect");
  //   // }
  //   //   else if (data.ok){
  //   //     localStorage.setItem('valid', 'true');
  //   //     localStorage.setItem('userid', data.userid.toString());
  //   //     localStorage.setItem('username', data.username);
  //   //     localStorage.setItem('email', data.email);
  //   //     localStorage.setItem('role', data.role);
  //   //     this.router.navigateByUrl("/home");
  //   //   } else if (data.userData.ok){
  //   //     localStorage.setItem('valid', 'true');
  //   //     localStorage.setItem('userid', data.userData.userid.toString());
  //   //     localStorage.setItem('username', data.userData.username);
  //   //     localStorage.setItem('email', data.userData.email);
  //   //     localStorage.setItem('role', data.userData.role);

  //   //     localStorage.setItem('userArray', JSON.stringify(data.userArray));
  //   //     localStorage.setItem('extendedUserArray', JSON.stringify(data.extendedUserArray));

  //   //     this.router.navigateByUrl("/home").then(()=>{
  //   //       window.location.reload();
  //   //     })
  //   //   } 
  //   })
  // }
}

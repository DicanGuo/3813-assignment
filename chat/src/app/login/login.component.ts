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

constructor(private router:Router ){}

  ngOnInit(): void {
  }

}

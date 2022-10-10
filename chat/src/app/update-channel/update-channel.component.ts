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
  selector: 'app-update-channel',
  templateUrl: './update-channel.component.html',
  styleUrls: ['./update-channel.component.css']
})
export class UpdateChannelComponent implements OnInit {

  constructor(private router:Router, private httpClient: HttpClient ) { 
  }
  ngOnInit(): void {
  }
  refreshWindow(){
    window.location.reload();
  };
}

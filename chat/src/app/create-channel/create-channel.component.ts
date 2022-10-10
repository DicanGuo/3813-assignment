import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
  // group
  _id = undefined;
  id = undefined;
  groupadmin: String[] = [];
  groupassis: String[] = [];
  groupusers: String[] = [];
  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.init();
  }
  init(){
    let targetgroup = JSON.parse(localStorage.getItem('targetGroup')!);
    this._id = targetgroup._id;
    this.id = targetgroup.id;
    this.groupadmin = targetgroup.groupadmin;
    this.groupassis = targetgroup.groupassis;
    this.groupusers = targetgroup.groupusers;
  }
}

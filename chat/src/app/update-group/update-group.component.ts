import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {
  id = undefined;
  groupadmin = [];
  groupassis = [];
  groupusers = [];
  constructor(private router:Router, private httpClient: HttpClient ) { 
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    let targetgroup = JSON.parse(localStorage.getItem('targetGroup')!);
    this.id = targetgroup.id;
    this.groupadmin = targetgroup.groupadmin;
    this.groupassis = targetgroup.groupassis;
    this.groupusers = targetgroup.groupusers;
  }

  cancel(){
    localStorage.removeItem('targetGroup');
    this.router.navigateByUrl("/group");

  }

}

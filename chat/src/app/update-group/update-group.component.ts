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
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {
  _id = undefined;
  id = undefined;
  groupadmin: String[] = [];
  groupassis: String[] = [];
  groupusers: String[] = [];
  newAdmin = '';
  newAssis = '';
  newUser = '';

  constructor(private router:Router, private httpClient: HttpClient ) { 
  }

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

  cancel(){
    localStorage.removeItem('targetGroup');
    this.router.navigateByUrl("/group");

  }

  update(){
    if(!(this.newAdmin == '')){
      this.groupadmin.push(this.newAdmin);
    }
    if(!(this.newAssis == '')){
      this.groupassis.push(this.newAdmin);
    }
    if(!(this.newUser == '')){
      this.groupusers.push(this.newAdmin);
    }
    if(this.newAdmin == '' && this.newAssis == '' && this.newUser == ''){
      alert('Input is empty !')
    }else{
      let targetGroup = {'_id':this._id, 'id':this.id, 'groupadmin': this.groupadmin, 'groupassis':this.groupassis, 'groupusers': this.groupusers}
      // console.log(newUser);
      this.httpClient.put(BACKEND_URL + '/api/updateGroup', targetGroup,  httpOptions)
        .subscribe((data: any) => {
          // alert(JSON.stringify(data));
          console.log(data)
          if(data.ok){
            // localStorage.setItem('extendedUserArray', JSON.stringify(data.uArray));
            alert(JSON.stringify(data.message));
            // setTimeout(this.refreshWindow, 1000);
          } else {
            alert('failed: ' + JSON.stringify(data.message));
            this.refreshWindow();
          }
        });
    }

  };

  refreshWindow(){
    window.location.reload();
  };
};

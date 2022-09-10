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
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  groupid = '';
  groupusers = '';
  groupassis = '';
  groupadmin = '';
  extendedUserArray = JSON.parse(localStorage.getItem('extendedUserArray')!);
  constructor(private router:Router, private httpClient: HttpClient ) { 

  }
  ngOnInit(): void {
  }
  create(){
    let newGroup = {'groupid':'', 'groupusers': [Number(this.groupusers)], 'groupassis': [Number(this.groupassis)], 'groupadmin': [Number(this.groupadmin)]}
    console.log(newGroup);
    this.httpClient.post(BACKEND_URL + '/creategroup', newGroup,  httpOptions)
      .subscribe((data: any) => {
        console.log(data)
        // console.log(data.ok)
        // console.log(data.message)
            //     alert(JSON.stringify(data));
        if(data.ok){
          localStorage.setItem('groupsSession', JSON.stringify(data.gArray));
          alert(JSON.stringify(data.message));
          this.router.navigateByUrl("/group");
        } else {
          alert('failed: ' + JSON.stringify(data.message));
        }
      });

  }
  

}

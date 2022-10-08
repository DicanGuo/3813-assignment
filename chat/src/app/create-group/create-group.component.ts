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

  id = '';
  groupusers = '';
  groupassis = '';
  groupadmin = '';
  // extendedUserArray = JSON.parse(localStorage.getItem('extendedUserArray')!);
  constructor(private router:Router, private httpClient: HttpClient ) { 

  }
  ngOnInit(): void {
  }
  create(){
    let newGroup = {'id':undefined, 'groupusers': [this.groupusers], 'groupassis': [this.groupassis], 'groupadmin': [this.groupadmin]}
    console.log(newGroup);
    this.httpClient.post(BACKEND_URL + '/api/createGroup', newGroup,  httpOptions)
      .subscribe((data: any) => {
        if(data.ok){
          // localStorage.setItem('extendedUserArray', JSON.stringify(data.uArray));
          alert(JSON.stringify(data.message));
          setTimeout(this.refreshWindow, 1000);
          this.router.navigateByUrl("/group");
        } else {
          alert('failed: ' + JSON.stringify(data.message));
        }
    });

  }
  refreshWindow(){
    window.location.reload();
  }
  

}

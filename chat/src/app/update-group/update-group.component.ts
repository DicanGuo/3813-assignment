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
  groups = JSON.parse(localStorage.getItem('groups')!);
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
      let targetGroup = {'_id':this._id, 'id':this.id, 'groupadmin': this.groupadmin, 'groupassis':this.groupassis, 'groupusers': this.groupusers}
      // console.log(newUser);
      this.httpClient.put(BACKEND_URL + '/api/updateGroup', targetGroup,  httpOptions)
        .subscribe((receivedData: any) => {
          // alert(JSON.stringify(data));
          console.log(receivedData)
          if(receivedData.ok){
            let data = receivedData.groups
            console.log(data)
            localStorage.setItem('groups', JSON.stringify(data));

            for(let i=0; i< this.groups.length;i++){
              // console.log(this.groups[i]._id )
              for(let j=0; j< data.length;j++){
                if(targetGroup._id == data[j]._id){
                  // console.log('targetGroup._id'+targetGroup._id, 'data[j]._id'+data[j]._id)
                  localStorage.setItem('targetGroup', JSON.stringify(data[j]));

                }
              }
            }

            // localStorage.setItem('groups', JSON.stringify(data.uArray));
            alert(JSON.stringify(receivedData.message));
            this.refreshWindow();
          } else {
            alert('failed: ' + JSON.stringify(receivedData.message));
            this.refreshWindow();
          }
        });
  };
  add(){

    if(this.newAdmin == '' && this.newAssis == '' && this.newUser == ''){
      alert('Input is empty !');
      this.refreshWindow();
    }else{
      if(this.groupadmin.includes(this.newAdmin)){
        alert('User is already an Admin !');
        this.refreshWindow();
      }
      else if(this.groupassis.includes(this.newAssis)){
        alert('User is already an Admin !');
        this.refreshWindow();
      }
      else if(this.groupusers.includes(this.newUser)){
        alert('User is already an Admin !');
        this.refreshWindow();
      }else{
        if(!(this.newAdmin == '')){
          this.groupadmin.push(this.newAdmin);
        }
        if(!(this.newAssis == '')){
          this.groupassis.push(this.newAssis);
        }
        if(!(this.newUser == '')){
          this.groupusers.push(this.newUser);
        }
        this.update();
      }
    }
  }
  deleteAdmin(admin: String){
    // console.log(admin)

    for(let i=0;i< this.groupadmin.length;i++){
      // console.log(this.groupadmin[i])
      if(admin == this.groupadmin[i]){
        this.groupadmin.splice(i,1)
      }
    }
    // console.log(this.groupadmin)
    this.update();
  }
  deleteAssis(assis: String){
    // console.log(assis)

    for(let i=0;i< this.groupassis.length;i++){
      // console.log(this.groupassis[i])
      if(assis == this.groupassis[i]){
        this.groupassis.splice(i,1)
      }
    }
    // console.log(this.groupassis)
    this.update();
  }
  deleteUser(user: String){
    // console.log(user)

    for(let i=0;i< this.groupusers.length;i++){
      // console.log(this.groupusers[i])
      if(user == this.groupusers[i]){
        this.groupusers.splice(i,1)
      }
    }
    // console.log(this.groupusers)
    this.update();
  }

  refreshWindow(){
    window.location.reload();
  };
};

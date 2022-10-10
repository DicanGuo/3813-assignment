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
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  valid = this.currentUser.valid;
  userid = this.currentUser.user[0].id;
  username = this.currentUser.user[0].name;
  role = this.currentUser.user[0].role;
  email = this.currentUser.user[0].email;
  groupsSession = localStorage.getItem('groups')!;
  groups = JSON.parse(this.groupsSession);
  // extendedUserArraySession = localStorage.getItem('extendedUserArray')!;
  // extendedUserArray = JSON.parse(this.extendedUserArraySession);

  addUser = '';
  asignAdmin = '';
  asignAssis = '';

  targetGroup = {"groupid": '',"groupusers":'',"groupassis":'',"groupadmin":''};

  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getGroupList()
  }

  getGroupList(){
    this.httpClient.get(BACKEND_URL + '/api/getGroups')
      .subscribe((data: any) => {
        // alert(JSON.stringify(data));
        console.log(data)
        console.log(JSON.stringify(data))
        localStorage.setItem('groups', JSON.stringify(data));
        // localStorage.setItem('extendedUserArray', JSON.stringify(data));

      });
  }

  test(){
    console.log(this.groups)

  }

  delete(targetGroup: any){
    console.log(targetGroup);
    this.httpClient.post(BACKEND_URL + '/api/deleteGroup', targetGroup,  httpOptions)
      .subscribe((data: any) => {
        // alert(JSON.stringify(data));
        console.log(data)
        localStorage.setItem('groups', JSON.stringify(data));
    });
    setTimeout(this.refreshWindow, 500);
  };

  edit(targetGroup: any){
    console.log(targetGroup);
    let targetId = targetGroup.id;
    localStorage.setItem('targetGroup', JSON.stringify(targetGroup));
    this.router.navigateByUrl('/update-group/'+ targetId);
  }

  channel(targetGroup: any){
    let targetId = targetGroup.id;
    localStorage.setItem('targetGroup', JSON.stringify(targetGroup));
    this.router.navigateByUrl('/group/'+ targetId + '/channels');

  }

  // addUsertoGroup(group:any){
  //   let addUser = this.addUser;
  //   // let targetGroup = {"groupid": this.group,"groupusers":this.group,"groupassis":this.targetGroup.groupassis,"groupadmin":this.targetGroup.groupadmin};
  //   // console.log(addUser);
  //   // console.log(group.groupusers);

  //   group.groupusers.push(String(addUser));
  //   // console.log(group.groupusers);
  //   console.log(group);

  //   this.httpClient.post(BACKEND_URL + '/updategroup', group,  httpOptions)
  //   .subscribe((data:any)=>{
  //     if(data.ok){
  //       // alert(data.ok);

  //       alert(data.message);
  //       localStorage.setItem('groupsSession', JSON.stringify(data.gArray));

  //       window.location.reload();
  //     }else{
  //       // alert(data.ok);

  //       alert(data.message);
  //       window.location.reload();
  //     }
  //   })
  // }

  // assignUser(group:any){
  //   let asignAdmin = this.asignAdmin;
  //   let asignAssis = this.asignAssis;
  //   console.log(asignAdmin)
  //   console.log(asignAssis)

  //   let editGroup = group;
  //   console.log(editGroup);
  //   console.log(editGroup.groupadmin.push(String(asignAdmin)));

  //   // if(!(asignAdmin='')){
  //   //   editGroup.groupadmin.push(JSON.stringify(asignAdmin));
  //   // }
  //   // if(!(asignAssis='')){
  //   //   editGroup.groupassis.push(JSON.stringify(asignAssis));
  //   // }

  //   // console.log(group.groupusers);
  //   // console.log(editGroup);

  //   this.httpClient.post(BACKEND_URL + '/assignUser', editGroup,  httpOptions)
  //   .subscribe((data:any)=>{
  //     if(data.ok){
  //       // alert(data.ok);

  //       alert(data.message);
  //       localStorage.setItem('groupsSession', JSON.stringify(data.gArray));

  //       window.location.reload();
  //     }else{
  //       // alert(data.ok);

  //       alert(data.message);
  //       window.location.reload();
  //     }
  //   })
  // }

  
  refreshWindow(){
    window.location.reload();
  }
}

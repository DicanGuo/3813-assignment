import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  valid = sessionStorage.getItem('valid');
  username = sessionStorage.getItem('username');
  userid = sessionStorage.getItem('userid');
  role = sessionStorage.getItem('role');
  email = sessionStorage.getItem('email');
  userArray = JSON.parse(sessionStorage.getItem('userArray')!);
  extendedUserArray = JSON.parse(sessionStorage.getItem('extendedUserArray')!);
  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  create(){
    this.router.navigateByUrl("/create-user");

  }
  delete(targetName: string){
    console.log(targetName);
    this.httpClient.post(BACKEND_URL + '/deleteuser', targetName,  httpOptions)
    // this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      // alert("posting: " +JSON.stringify(user));
      console.log(data);
      // alert("postRes: " +JSON.stringify(data));

      if (data.ok){
          console.log('ok')
          sessionStorage.setItem('allUser', JSON.stringify(data.allUser));

      //   sessionStorage.setItem('valid', 'true');
      //   sessionStorage.setItem('userid', data.userid.toString());
      //   sessionStorage.setItem('username', data.username);
      //   sessionStorage.setItem('email', data.email);
      //   sessionStorage.setItem('role', data.role);
      //   this.router.navigateByUrl("/home");
      // } else if (data.userData.ok){
      //   sessionStorage.setItem('valid', 'true');
      //   sessionStorage.setItem('userid', data.userData.userid.toString());
      //   sessionStorage.setItem('username', data.userData.username);
      //   sessionStorage.setItem('email', data.userData.email);
      //   sessionStorage.setItem('role', data.userData.role);

      //   sessionStorage.setItem('userArray', JSON.stringify(data.userArray));
      //   sessionStorage.setItem('extendedUserArray', JSON.stringify(data.extendedUserArray));

      //   this.router.navigateByUrl("/home");
      }
      else { alert("User doesn't exist");}
    })
  }

}

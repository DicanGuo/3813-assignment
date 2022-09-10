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
  valid = localStorage.getItem('valid');
  username = localStorage.getItem('username');
  userid = localStorage.getItem('userid');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  userArray = JSON.parse(localStorage.getItem('userArray')!);
  extendedUserArray = JSON.parse(localStorage.getItem('extendedUserArray')!);
  
  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  create(){
    this.router.navigateByUrl("/create-user");

  }
  delete(targetUser: any){
    console.log(targetUser);
    this.httpClient.post(BACKEND_URL + '/deleteuser', targetUser,  httpOptions)
    // this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      // alert("posting: " +JSON.stringify(user));
      console.log(data);
      // alert("postRes: " +JSON.stringify(data));

      if (data.ok){
          console.log('ok')
          localStorage.setItem('extendedUserArray', JSON.stringify(data.uArray));
          alert(JSON.stringify(data.message));
          window.location.reload();
      }
      else { alert(data.message);}
    })
  }

}

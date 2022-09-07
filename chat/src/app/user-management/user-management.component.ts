import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  create(){
    this.router.navigateByUrl("/create-user");

  }

}

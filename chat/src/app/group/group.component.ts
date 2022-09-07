import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  valid = sessionStorage.getItem('valid');
  username = sessionStorage.getItem('username');
  userid = sessionStorage.getItem('userid');
  role = sessionStorage.getItem('role');
  email = sessionStorage.getItem('email');
  groupsSession = sessionStorage.getItem('groupsSession')!;
  groups = JSON.parse(this.groupsSession);
  // allUsersString = sessionStorage.getItem('allUser')!;
  // allUsers = JSON.parse(this.allUsersString);
  constructor() { }

  ngOnInit(): void {
  }
  test(){
    console.log(this.groups)

  }
}

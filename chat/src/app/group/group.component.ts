import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  valid = sessionStorage.getItem('valid');
  username = sessionStorage.getItem('username');
  id = sessionStorage.getItem('id');
  role = sessionStorage.getItem('role');
  email = sessionStorage.getItem('email');
  groupsSession = sessionStorage.getItem('groupsSession')!;
  groups = JSON.parse(this.groupsSession);
  
  constructor() { }

  ngOnInit(): void {
  }

}

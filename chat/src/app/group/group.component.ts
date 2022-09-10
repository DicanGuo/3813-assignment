import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  valid = localStorage.getItem('valid');
  username = localStorage.getItem('username');
  userid = localStorage.getItem('userid');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  groupsSession = localStorage.getItem('groupsSession')!;
  groups = JSON.parse(this.groupsSession);
  extendedUserArraySession = localStorage.getItem('extendedUserArray')!;
  extendedUserArray = JSON.parse(this.extendedUserArraySession);
  constructor() { }

  ngOnInit(): void {
  }
  test(){
    console.log(this.groups)

  }
}

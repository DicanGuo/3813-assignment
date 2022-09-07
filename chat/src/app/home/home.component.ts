import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  valid = sessionStorage.getItem('valid');
  username = sessionStorage.getItem('username');

  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    sessionStorage.clear();
    console.log(sessionStorage);
    this.router.navigateByUrl('/login');
  }
  chat(){
    console.log(this.username)
    this.router.navigateByUrl('/chat/' + this.username);

  }

}

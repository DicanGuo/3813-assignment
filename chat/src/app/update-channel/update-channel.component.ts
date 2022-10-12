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
  selector: 'app-update-channel',
  templateUrl: './update-channel.component.html',
  styleUrls: ['./update-channel.component.css']
})
export class UpdateChannelComponent implements OnInit {
  newUser: String = '';
  // channel
  _id = undefined;
  id = undefined;
  groupid= undefined;
  channelusers: String[] = [];
  targetChannel = JSON.parse(localStorage.getItem('targetChannel')!);

  constructor(private router:Router, private httpClient: HttpClient ) { 
  }
  ngOnInit(): void {
    this.init();

  }

  init(){
    this._id = this.targetChannel._id;
    this.id = this.targetChannel.id;
    this.groupid = this.targetChannel.groupid;
    this.channelusers = this.targetChannel.channelusers;
    console.log(this.channelusers)

  }

  add(){
    if(this.newUser == ''){
      alert('Input is empty !');
      // this.refreshWindow();
    }else{
      console.log(this.channelusers)
      console.log(this.newUser)

      if(this.channelusers.includes(this.newUser)){
        alert('User already in channel !');
      }else {
        this.channelusers.push(this.newUser);
        console.log(this.channelusers);
        this.update();
      }
    }
  }

  deleteUser(targetUser:any){

    for(let i=0;i< this.channelusers.length;i++){
      console.log(this.channelusers[i])
      if(targetUser == this.channelusers[i]){
        this.channelusers.splice(i,1)
      }
    }
    console.log(this.channelusers)
    this.update();
  
  }

  update(){
    let tChannel = {'_id':this._id, 'id':this.id, 'groupid':this.groupid, 'channelusers': this.channelusers}
    
    // console.log(newUser);
    this.httpClient.put(BACKEND_URL + '/api/updateChannel', tChannel,  httpOptions)
      .subscribe((receivedData: any) => {
        // alert(JSON.stringify(data));
        console.log(receivedData)
        if(receivedData.ok){
          alert(receivedData.message)
          let data = receivedData.channels
          console.log(data)
          localStorage.setItem('channels', JSON.stringify(receivedData.channels));

          // this.refreshWindow();

        //   for(let i=0; i< this.groups.length;i++){
        //     // console.log(this.groups[i]._id )
        //     for(let j=0; j< data.length;j++){
        //       if(targetGroup._id == data[j]._id){
        //         // console.log('targetGroup._id'+targetGroup._id, 'data[j]._id'+data[j]._id)
        //         localStorage.setItem('targetGroup', JSON.stringify(data[j]));

        //       }
        //     }
          // }

        //   // localStorage.setItem('groups', JSON.stringify(data.uArray));
        //   alert(JSON.stringify(receivedData.message));
        //   this.refreshWindow();
        } else {
          alert('failed: ' + JSON.stringify(receivedData.message));
          this.refreshWindow();
        }
      });
    localStorage.setItem('targetChannel', JSON.stringify(tChannel));

    this.targetChannel = JSON.parse(localStorage.getItem('targetChannel')!);

    
  };

  back(){
    localStorage.removeItem('targetChannel');
    this.router.navigateByUrl('/group/' + this.groupid + '/channels');
  }

  refreshWindow(){
    window.location.reload();
  };
}

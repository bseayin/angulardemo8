import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { User } from '../user';
import {UserService} from '../user/user.service';
import { WebSocketService } from '../shared/web-socket.service'; 
import { CookieService } from 'ngx-cookie-service'; 
import { LocalStorage } from './local.storage';
@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit {
  users: User[];
  imgUrl: string = "http://via.placeholder.com/300x100";
  prefixUrl: string="ws://localhost:8666/project2/ws/chatRoom/";
  sendText:string;
  chatContent: string=' ';
  user:User=new User();
  constructor(private userservice:UserService,private sharedService:SharedService
    ,private wsService:WebSocketService,private cookieService:CookieService,private localStorage:LocalStorage) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("大厅");
    let userid=this.cookieService.get("loginuid");
    this.getUser();
    this.chatContent=this.localStorage.getObject("data");
  }
  getUser(): void {
    this.userservice.getUsers()
      .subscribe(
        userservice => {
          this.users = userservice;
        });
  }

  sendMessageToserver(){
    this.wsService.sendMessage(this.sendText);
  }
  join(){
         // this.wsService.createObservableSocket(this.prefixUrl+this.user.name+"/")
         this.wsService.createObservableSocket(this.prefixUrl+"xgg/")
         .subscribe(    
             data => {this.chatContent=this.chatContent+"\n"+data;
             this.localStorage.setObject("data",this.chatContent);
            },
             err => console.log(err),
             () => console.log("流已经结束"),
         );
  }
  exit(){
    this.wsService.closeWebSocket();
  }
}
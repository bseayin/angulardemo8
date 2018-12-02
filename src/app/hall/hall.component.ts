import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { User } from '../user';
import { WebSocketService } from '../shared/web-socket.service'; 
import { CookieService } from 'ngx-cookie-service'; 
import { LocalStorage } from './local.storage';
import { HallService } from './hall.service';

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
  name:string;
  constructor(private sharedService:SharedService,
    private wsService:WebSocketService,
    private cookieService:CookieService,
    private localStorage:LocalStorage,
    private hallService:HallService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("大厅");
    let userid=this.cookieService.get("loginuid");
    this.chatContent=this.localStorage.getObject("data");
    this.getUsers();
    this.hallService.getU().subscribe(
        user => {
      this.user = user;
      this.name= this.user.name;
    });
  }
  getUsers(): void {
    this.hallService.getUsers()
      .subscribe(
        hallService => {
          this.users = hallService;
        });
  }

  sendMessageToserver(){
    this.wsService.sendMessage(this.sendText);
  }

  join(){
         // this.wsService.createObservableSocket(this.prefixUrl+this.user.name+"/")
         this.wsService.createObservableSocket(this.prefixUrl+this.name+"/")
         .subscribe(    
             data => {this.chatContent=this.chatContent+"\n"+data;
             this.localStorage.setObject("data",this.chatContent);
            },
             err => console.log(err),
             () => {this.localStorage.setObject("data"," ");
                    console.log("流已经结束")},
         );
  }
  exit(){
    this.wsService.closeWebSocket();
  }
}
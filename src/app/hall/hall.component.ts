import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { User } from '../user';
import {UserService} from '../user/user.service';
import { WebSocketService } from '../shared/web-socket.service'; 
@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit {
  users: User[];
  imgUrl: string = "http://via.placeholder.com/300x100";
  prefixUrl: string="ws://192.168.0.104:8666/project2/ws/chatRoom/";
  sendText:string;
  chatContent: string=' ';
  constructor(private userservice:UserService,private sharedService:SharedService
    ,private wsService:WebSocketService
  ) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("大厅");
    this.wsService.createObservableSocket("ws://localhost:8666/project2/ws/chatRoom/dd/")
    .subscribe(
        data => this.chatContent=this.chatContent+"\n"+data,
        err => console.log(err),
        () => console.log("流已经结束")
    )
    this.getUser();
  }
  getUser(): void {
    this.userservice.getUsers()
      .subscribe(
        userservice => {
          this.users = userservice;
          console.log(this.users);
        });
  }

  sendMessageToserver(){
    this.wsService.sendMessage(this.sendText);
}
}

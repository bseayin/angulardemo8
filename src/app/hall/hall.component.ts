import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { User } from '../user';
import {UserService} from '../user/user.service';
@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit {
  users: User[];
  imgUrl: string = "http://via.placeholder.com/300x100"
  constructor(private userservice:UserService,private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("大厅");
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
}

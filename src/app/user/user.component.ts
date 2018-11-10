import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {UserService} from './user.service';
import { User } from '../user';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet :User[];
  userlist:User[];

   // 输出属性，需要定义成事件
   @Output() childtellEvent: EventEmitter<any> = new EventEmitter();

  startEdit(id: number): void {
    this.editCache[ id ].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[ id ].edit = false;
  }

  saveEdit(id: number): void {
    console.log("saveEdit----"+id);
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[ id ].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      console.log("updateEditCache---id"+item.id);
      console.log("updateEditCache---id"+this.editCache[ item.id ]);
      if (!this.editCache[ item.id ]) {
        this.editCache[ item.id ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }
  constructor(private userservice:UserService,private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("用户管理");
    this.getUser();
   
  }


  getUser(): void {
    this.userservice.getUsers()
      .subscribe(
        userservice => {
          this.dataSet = userservice;
          this.updateEditCache();

        });
  }

  

}

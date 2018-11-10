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
  dataSet = [];
  userlist:User[];

   // 输出属性，需要定义成事件
   @Output() childtellEvent: EventEmitter<any> = new EventEmitter();

  startEdit(id: string): void {
    this.editCache[ id ].edit = true;
  }

  cancelEdit(id: string): void {
    this.editCache[ id ].edit = false;
  }

  saveEdit(id: string): void {
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[ id ].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
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
    this.getUser;
    this.updateEditCache();
  }


  getUser(): void {
    this.userservice.getUsers()
      .subscribe(userservice => this.dataSet = userservice);


  }

  emitFun() {
    // 如果组件中，修改了某些数据，需要刷新用用户列表，用户列表在其他组件中，那么就可以发射一个字符串过去，那边接收到这个字符串比对一下，刷新列表。
    this.userservice.eventEmit.emit("用户管理");
}

}

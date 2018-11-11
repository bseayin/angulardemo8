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
   dt1:Date=new Date();
   dateinput:string='';
   isVisible = false;
  isOkLoading = false;
  newuser:User=new User();
  namecheck=false;
  pwd:string;
  options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
        isLeaf: true
      }]
    }, {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }]
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        isLeaf: true
      }]
    }]
  }];
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("----handleOk----")
    console.log(this.dt1);
    console.log(this.dateinput);
    this.isOkLoading = true;
    console.log("----handleOk22222----")
    console.log(this.newuser.name);
   
    if(!this.namecheck){
      this.userservice.updateUser(this.newuser).subscribe(
        user => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.addRow(this.newuser);
        console.log('添加成功')}
      );
    }
    
   
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  startEdit(id: number): void {
    this.editCache[ id ].edit = true;
  }

 

  cancelEdit(id: number): void {
    this.editCache[ id ].edit = false;
  }

  addRow(u:User): void {
    this.i++;
   
    this.dataSet = [ ...this.dataSet, u
     ];
    this.updateEditCache();
  }

  deleteRow(i: number): void {
    const dataSet = this.dataSet.filter(d => d.id !== i);
    this.dataSet = dataSet;
    this.userservice.deleteUser(i).subscribe(()=>console.log('删除成功'));
  }

  saveEdit(id: number): void {
    console.log("saveEdit----"+id);
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[ id ].edit = false;
    console.log(this.editCache[ id ].data);
    console.log(this.dataSet[ index ]);
    this.userservice.updateUser(this.editCache[ id ].data).subscribe(
      user => console.log('修改成功')
    );
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
          console.log(this.dataSet);
          this.updateEditCache();

        });
  }

  

}

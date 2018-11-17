import { Component, OnInit } from '@angular/core';
import { Member } from '../Model/member';
import {MemberService  } from './member.service';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  i = 1;
  editCache = {};
  dataSet :Member[];
  isVisible = false;
  isOkLoading = false;
  newMember:Member=new Member();
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;

      this.MemberService.addMember(this.newMember).subscribe(
        sight => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.addRow(this.newMember);
        console.log('添加成功')}
      );

    
   
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

  addRow(m:Member): void {
    this.i++; 
    this.dataSet = [ ...this.dataSet, m
     ];
    this.updateEditCache();
  }

  deleteRow(i: number): void {
    const dataSet = this.dataSet.filter(d => d.id !== i);
    this.dataSet = dataSet;
    this.MemberService.deleteMember(i).subscribe(()=>console.log('删除成功'));
  }

  saveEdit(id: number): void {
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[ id ].edit = false;
    this.MemberService.updateMember(this.editCache[ id ].data).subscribe(
      user => console.log('修改成功')
    );
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
  constructor(private MemberService:MemberService) { }

  ngOnInit() {
    this.getMembers();
  }
  getMembers(): void {
    this.MemberService.getMembers()
      .subscribe(
        slightService => {
                this.dataSet = slightService;
                console.log(this.dataSet);
                this.updateEditCache();
        });
  }

}

import { Component, OnInit } from '@angular/core';
import { Sight } from './sight';
import {SightService  } from './sight.service';

@Component({
  selector: 'app-sight',
  templateUrl: './sight.component.html',
  styleUrls: ['./sight.component.css']
})
export class SightComponent implements OnInit {

  i = 1;
  editCache = {};
  dataSet :Sight[];
  dt1:Date=new Date();
  dt2:Date=new Date();
  isVisible = false;
  isOkLoading = false;
  newslight:Sight=new Sight();
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;

      this.slightService.addSight(this.newslight).subscribe(
        sight => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.addRow(this.newslight);
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

  addRow(s:Sight): void {
    this.i++; 
    this.dataSet = [ ...this.dataSet, s
     ];
    this.updateEditCache();
  }

  deleteRow(i: number): void {
    const dataSet = this.dataSet.filter(d => d.id !== i);
    this.dataSet = dataSet;
    this.slightService.deleteSlight(i).subscribe(()=>console.log('删除成功'));
  }

  saveEdit(id: number): void {
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[ id ].edit = false;
    this.slightService.updateSight(this.editCache[ id ].data).subscribe(
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
  constructor(private slightService:SightService) { }

  ngOnInit() {
    this.getSlights();
  }
  getSlights(): void {
    this.slightService.getSlights()
      .subscribe(
        slightService => {
                this.dataSet = slightService;
                console.log(this.dataSet);
                this.updateEditCache();
        });
  }
}

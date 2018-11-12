import { Component, OnInit } from '@angular/core';
import { Functions } from './functions';
import { FunctionsService } from './functions.service';
@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet :Functions[];
  dt1:Date=new Date();
  dateinput:string='';
  isVisible = false;
  isOkLoading = false;
  newfunctions:Functions=new Functions();
  pwd:string;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;

      this.functionsService.updateFunctions(this.newfunctions).subscribe(
        functions => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.addRow(this.newfunctions);
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

  addRow(f:Functions): void {
    this.i++; 
    this.dataSet = [ ...this.dataSet, f
     ];
    this.updateEditCache();
  }

  deleteRow(i: number): void {
    const dataSet = this.dataSet.filter(d => d.id !== i);
    this.dataSet = dataSet;
    this.functionsService.deleteUser(i).subscribe(()=>console.log('删除成功'));
  }

  saveEdit(id: number): void {
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[ id ].edit = false;
    this.functionsService.updateFunctions(this.editCache[ id ].data).subscribe(
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
  constructor(private functionsService:FunctionsService) { }

  ngOnInit() {
    this.getFunctions();
  }
  getFunctions(): void {
    this.functionsService.getFunctions()
      .subscribe(
        functionsService => {
                this.dataSet = functionsService;
                console.log(this.dataSet);
                this.updateEditCache();
        });
  }
}

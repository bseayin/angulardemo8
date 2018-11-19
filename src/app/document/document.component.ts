import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { DocumentService } from './document.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Document} from './document'
import { Functions} from './functions'


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  // functionName:string='功能点';
  // moduleName:string=''; //文档中的模块名称
  // blockName:string='跳转关系'; //区块名称
  // content: string = '';
  fileList = [];
  previewImage = '';
  previewVisible = false;
  editCache = {};
  dataSet:Functions[];
  fun:Functions = new Functions();
  doucument:Document=new Document();
  function:Document[];
  edit = false;


  constructor(private sharedService:SharedService,private documentService:DocumentService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("文档");
    this.doucument.functionname="功能点";
    this.doucument.block="跳转关系";
    this.getFunctions();
    this.getFunction();
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  getFunctions(): void {
    this.documentService.getFunctions()
      .subscribe(
        documents => {
          this.dataSet = documents;
          this.updateEditCache();
        });
  }

  getFunction(): void {
    this.documentService.getFunction()
      .subscribe(
        documents => {
          this.function = documents;
        });
  }

  savedoc():void{
    for(var i=0;i<this.fileList.length;i++){
      if(i==0)
        this.doucument.picture1 = this.fileList[i].name;
      if(i==1)
        this.doucument.picture2 = this.fileList[i].name;
      if(i==2)
        this.doucument.picture3 = this.fileList[i].name;
      if(i==3)
        this.doucument.picture4 = this.fileList[i].name;
    }
    this.documentService.savedoc(this.doucument);
    this.documentService.updateFunction(this.fun);
    this.edit = false;
    alert('保存成功');
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

  startEdit(id: number): void {
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.fun = this.dataSet[ index ];
    if(this.fun.docstatus == '已编辑'){
      this.doucument = this.function.find(item => item.functionname === this.dataSet[ index ].fname && item.module ===this.dataSet[index].docmodule);
      console.log(this.doucument);
    }else{
      this.doucument.functionname = this.dataSet[ index ].fname;
      this.doucument.module = this.dataSet[index].docmodule;
      this.dataSet[index].docstatus = '已编辑';
      this.fun.docstatus = '已编辑';
    }
    this.edit = true;
  }

  show(): void{
    console.log(this.doucument);
  }

  i = 1;
  

  addRow(): void {
    this.i++;
    
    this.updateEditCache();
  }

  deleteRow(i: number): void {
    const dataSet = this.dataSet.filter(d => d.id !== i);
    this.dataSet = dataSet;
  }


  finishEdit(key: number): void {
    this.editCache[ key ].edit = false;
    this.dataSet.find(item => item.id === key).docmodule = this.editCache[ key ].module;
  }

  
  


}

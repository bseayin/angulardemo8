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
  functionName:string='功能点';
  moduleName:string=''; //文档中的模块名称
  blockName:string='跳转关系'; //区块名称
  content: string = '';
  fileList = [];
  previewImage = '';
  previewVisible = false;
  editCache = {};
  dataSet:Functions[];
  fun:Functions = new Functions();
  doucument:Document=new Document();
  function:Document[];
  edit = false;
  flag:number;
  


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


  startEdit(id: number): void {
    this.flag = id;
    const index = this.dataSet.findIndex(item => item.id === id);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.fun = this.dataSet[ index ];
    if(this.fun.docstatus == '已编辑'){
      console.log("-----------已编辑------------")
      console.log("-----------index------------"+index)
      console.log("-----------id------------"+id)
      console.log(this.dataSet[ index ])
      console.log(this.function)
      this.doucument.functionname=this.fun.fname;
      this.doucument.module=this.fun.docmodule;
      this.doucument.content = "";
      for(var i=0;i<this.function.length;i++){
        if(this.function[i].functionname===this.dataSet[ index ].fname&&this.function[i].module===this.dataSet[index].docmodule&&this.function[i].block===this.blockName){
          this.doucument=this.function[i];
          console.log("-----------if------------")
          console.log(this.doucument);
          break;
        }else{
          console.log("-----------else------------")
          
        }
      }
      console.log("-----------aaaa------------")
      console.log(this.doucument);
      
    }else{
      console.log("-----------wei编辑------------")
      this.doucument.functionname = this.dataSet[ index ].fname;
      this.doucument.module = this.dataSet[index].docmodule;
      this.dataSet[index].docstatus = '已编辑';
      this.fun.docstatus = '已编辑';
    }
    this.edit = true;
  }

  select():void{
    
    if(this.edit){
      this.startEdit(this.flag);
    }
  }

}

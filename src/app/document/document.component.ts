import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { DocumentService } from './document.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Document} from './document'
import { Functions} from './functions'
import { CookieService } from 'ngx-cookie-service'; 


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  // functionName:string='功能点';
  // moduleName:string=''; //文档中的模块名称
  blockName:string='跳转关系'; //区块名称
  // content: string = '';
  fileList = [];
  previewImage = '';
  previewVisible = false;
  editCache = {};
  dataSet:Functions[];
  fun:Functions = new Functions();
  doucument:Document=new Document();
  docs:Document[];
  edit = false;
  flag:number;
  pid = parseInt(this.cookie.get("pid"))/8;
  hosturl2 =  'project3/downloadDoc/'+this.pid;
  
  currentTr1:any;
  
  constructor(private sharedService:SharedService,private documentService:DocumentService,private cookie:CookieService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("文档");
    this.doucument.functionname="功能点";
    this.doucument.block="跳转关系";
    this.getFunctions();
    this.getDocs();
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  downloadDoc():void{
    this.documentService.downloadDoc();
  }

  getFunctions(): void {
    this.documentService.getFunctions()
      .subscribe(
        functions => {
          this.dataSet = functions;
        });
  }

  getDocs(): void {
    this.documentService.getDocs()
      .subscribe(
        documents => {
          this.docs = documents;
        });
  }

  savedoc():void{
    this.currentTr1.style='background-color:none';
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
    this.fun.docmodule = this.doucument.module;
    this.documentService.savedoc(this.doucument).subscribe();
    this.documentService.updateFunction(this.fun).subscribe();
    this.edit = false;
    this.doucument = new Document();
    this.doucument.functionname = "功能点";
    this.doucument.module = "";
    this.doucument.content = "";
    this.doucument.block = "跳转关系";
    alert('保存成功');
  }


  startEdit(id: number,currentTr): void {
    if(this.currentTr1&&this.currentTr1!=currentTr){
      this.currentTr1.style='background-color:none';
    }
    currentTr.style='background-color:#F0F8FF';
    this.currentTr1 = currentTr;
    this.flag = id;
    this.fun = this.dataSet.find(item => item.id === id);
    const index = this.dataSet.findIndex(item => item.id === id);
    if(this.fun.docstatus == '已编辑'){
      this.doucument = this.docs.find(item => item.functionname === this.fun.fname && item.module === this.fun.docmodule && item.block === this.blockName);
      if(!this.doucument){
        this.doucument = new Document();
        this.doucument.functionname = this.fun.fname;
        this.doucument.module = this.fun.docmodule;
        this.doucument.content = "";
        this.doucument.block = this.blockName;
      }
    }else{
      this.doucument = new Document();
      this.doucument.functionname = this.fun.fname;
      this.doucument.module = this.fun.docmodule;
      this.doucument.content = "";
      this.doucument.block = this.blockName;
      this.dataSet[index].docstatus = '已编辑';
      this.fun.docstatus = '已编辑';
    }
    this.edit = true;
  }

  select():void{
    
    if(this.edit){
      this.startEdit(this.flag,this.currentTr1);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { DocumentService } from './document.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  functionName:string='功能点';
  moduleName:string=''; //文档中的模块名称
  blockName:string='跳转关系'; //区块名称
  fileList = [];
  previewImage = '';
  previewVisible = false;

  constructor(private sharedService:SharedService,private documentService:DocumentService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("文档");
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  show(){
    console.log("=====blockName===="+this.blockName);
  }


}

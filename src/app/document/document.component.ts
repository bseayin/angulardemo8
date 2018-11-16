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

  constructor(private sharedService:SharedService,private documentService:DocumentService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("文档");
    this.getFunctions();
    
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
          // this.updateEditCache();

        });
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

  startEdit(key: number): void {
    this.editCache[ key ].edit = true;
  }

  finishEdit(key: number): void {
    this.editCache[ key ].edit = false;
    this.dataSet.find(item => item.id === key).docmodule = this.editCache[ key ].module;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[ item.id ]) {
        this.editCache[ item.id ] = {
          edit: false,
          module: item.docmodule
        };
      }
    });
  }


}

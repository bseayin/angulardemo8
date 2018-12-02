import { Component, OnInit} from '@angular/core';
import { Functions } from './functions';
import { FunctionsService } from './functions.service';
import { PublishService } from './publish.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../user';
import { Mail } from '../model/mail';
@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {
  uid=parseInt(this.cookieService.get("loginuid"));
  pid=parseInt(this.cookieService.get("pid"));
  user:User;
  fid:number;
  publishList : User[];
  selectedPublishList : User[];
  mails:Array<Mail> = new Array<Mail>();
  mail:Mail=new Mail;
  allChecked = false;
  indeterminate = false;
  displayData = [];
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
      this.functionsService.addFunctions(this.newfunctions).subscribe(
        functions => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.addRow(this.newfunctions);}
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
    this.functionsService.deleteFunctions(i).subscribe(()=>console.log('删除成功'));
  }

  saveEdit(id: number): void {
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[ index ], this.editCache[ id ].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[ id ].edit = false;
    this.functionsService.updateFunctions(this.editCache[ id ].data).subscribe(
      functions => console.log('修改成功')
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
  constructor(private functionsService:FunctionsService,private publishService:PublishService,
    private cookieService:CookieService
    ) { }

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


  publishModalVisible = false;
  publicIsOkLoading = false;

  showPublishModal(fid:number): void {
    this.fid=fid;
    this.publishService.getPublishUser(this.uid,this.pid).subscribe(
      res=>{
       this.publishList=res;
      }
    );
    this.publishModalVisible = true;
  }

  publishHandleOk(): void {
    
    this.publicIsOkLoading = true;
    window.setTimeout(() => {
      this.publishModalVisible = false;
      this.publicIsOkLoading = false;
    }, 1000);
    this.selectedPublishList=this.displayData.filter(value => value.checked);
    this.selectedPublishList.forEach(date=>{
      let mail:Mail=new Mail();
      mail.sid=date.id;
      mail.fid=this.fid;
      mail.uid=this.uid/8;
      this.mails.push(mail);
    })
     this.publishService.publishInvitation(this.mails).subscribe(
      res=>{
      if(res!=null){
        alert("发送成功");
      }else{
        alert("发送失败");
      }
      }
    );
    this.mails.splice(0,this.mails.length);
  }

  publishHandleCancel(): void {
    this.publishModalVisible = false;
  }


  currentPageDataChange($event: Array<{ id: number;name:string ;skill:string;checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
}

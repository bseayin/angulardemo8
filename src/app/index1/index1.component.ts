import { Component, OnInit } from '@angular/core';
import { Index1Service } from '../index1.service';
import { SharedService } from '../shared.service';
import { PublishService } from '../functions/publish.service';
import { CookieService } from 'ngx-cookie-service'; 
import { YyhloginService } from './yyhlogin.service';
import { Hero } from '../hero';
import { Mail } from '../model/mail';
import { User } from '../user';
@Component({
  selector: 'app-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.css']
})
export class Index1Component implements OnInit {
  hide:boolean=false;
  invitationAction:string="";
  mails :Mail[];
  user:User=new User();
  //mails:Array<Mail> = new Array<Mail>();
  displayMail(){
    if(this.cookieService.get("loginuid")!=null){

      this.publishService.displayMesseges(parseInt(this.cookieService.get("loginuid"))).subscribe( res=>{
         if(res!=null){
        this.mails=res;
         }
      });
     }else{
       alert("未登录");
     }
  }
  acceptInvitation(fid:number){
    this.user.id=parseInt(this.cookieService.get("loginuid"));
    this.user.fid=fid;
    this.publishService.acceptInvitation(this.user).subscribe( res=>{
      if(res){
        this.hide=true;
        this.invitationAction="已接受";
      }
    });
    this.refreshMessegeNum();
  }

  refreshMessegeNum(){
    if(this.cookieService.get("loginuid")!=null){

      this.publishService.refreshMesseges(parseInt(this.cookieService.get("loginuid"))).subscribe(res=>{
        if(res[0].count!=0){
          this.messegesNum=res[0].count;
        }
      })
     }
  }

  messegesNum:number=0;
  result:any ;
  path:String;
  path2:String="首页";
  constructor(private index1Service:Index1Service,private sharedService:SharedService,
    private publishService:PublishService,private cookieService:CookieService, private yyhloginService:YyhloginService
    ) { }

  ngOnInit() {
     // 接收发射过来的数据
     this.sharedService.eventEmit.subscribe((value: any) => {
       this.path2=value;
   });
   this.refreshMessegeNum();
   
    
    var name='ttt';
    var id=7;
    this.index1Service.add({name,id} as Hero).subscribe(
      res=>{
        this.result=res;
        
      }
    );
  }
  yyhceshi(){
 
    this.yyhloginService.ceshilianjie().subscribe();
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Index1Service } from '../index1.service';
import { SharedService } from '../shared.service';
import { PublishService } from '../functions/publish.service';
import { CookieService } from 'ngx-cookie-service'; 
import { Hero } from '../hero';
@Component({
  selector: 'app-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.css']
})
export class Index1Component implements OnInit {
  messegesNum:number=0;
  result:any ;
  path:String;
  path2:String="首页";
  constructor(private index1Service:Index1Service,private sharedService:SharedService,
    private publishService:PublishService,private cookieService:CookieService 
    ) { }

  ngOnInit() {
     // 接收发射过来的数据
     this.sharedService.eventEmit.subscribe((value: any) => {
       this.path2=value;
   });
   if(this.cookieService.get("loginuid")!=null){

    this.publishService.refreshMesseges(parseInt(this.cookieService.get("loginuid"))).subscribe(res=>{
      if(res[0].count!=0){
        this.messegesNum=res[0].count;
      }
    })
   }
   
    
    var name='ttt';
    var id=7;
    this.index1Service.add({name,id} as Hero).subscribe(
      res=>{
        this.result=res;
        
      }
    );
  }

}

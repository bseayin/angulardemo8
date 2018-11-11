import { Component, OnInit } from '@angular/core';
import { Index1Service } from '../index1.service';
import { SharedService } from '../shared.service';
import { Hero } from '../hero';
@Component({
  selector: 'app-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.css']
})
export class Index1Component implements OnInit {
  result:any ;
  path:String;
  path2:String="首页";
  constructor(private index1Service:Index1Service,private sharedService:SharedService) { }

  ngOnInit() {
     // 接收发射过来的数据
     this.sharedService.eventEmit.subscribe((value: any) => {
       this.path2=value;
   });
    
    
    var name='ttt';
    var id=7;
    this.index1Service.add({name,id} as Hero).subscribe(
      res=>{
        this.result=res;
        
      }
    );
  }

}

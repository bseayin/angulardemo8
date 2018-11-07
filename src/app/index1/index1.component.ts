import { Component, OnInit } from '@angular/core';
import { Index1Service } from '../index1.service';
import { Hero } from '../hero';
@Component({
  selector: 'app-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.css']
})
export class Index1Component implements OnInit {
  result:any ;
  constructor(private index1Service:Index1Service) { }

  ngOnInit() {
    var name='ttt';
    var id=7;
    this.index1Service.add({name,id} as Hero).subscribe(
      res=>{
        this.result=res;
        
      }
    );
  }

}

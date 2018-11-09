import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  fromchildmessage:string="";
  constructor() { }
  tellResult(i:string){
    console.log("tellResult--"+i);
    this.fromchildmessage = i;
}
  ngOnInit() {
  }

}

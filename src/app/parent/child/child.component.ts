import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
// 子组件ts，告诉组件，message是父组件传进来的
@Input() public message: string;

childmessage: FormControl = new FormControl();

// 输出属性，需要定义成事件
@Output() childtellEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.childmessage.valueChanges.subscribe(msg => {
      // 通过emit将信息发射出去
      console.log("childmessage.valueChanges"+msg);
      this.childtellEvent.emit(msg);
    })
  }

}

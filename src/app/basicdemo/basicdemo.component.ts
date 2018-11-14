import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicdemo',
  templateUrl: './basicdemo.component.html',
  styleUrls: ['./basicdemo.component.css']
})
export class BasicdemoComponent implements OnInit {
  imgUrl: string = "http://via.placeholder.com/300x100";
  // 字符串类型
  allClass: string = 'bb cc';
  // 布尔类型
  bbValue: boolean = false;
  aaa;

  // 数组类型
  list: string[] = ['我的前半生','精彩绝伦','我的后半生','依然绚烂'];

  // 布尔类型
  show:boolean = true;
  name:string ="你今天咋了？";
  today: object = new Date();
  // 事件
  todoClick(test:any){
    alert('点我干嘛？');
    this.name="爱你所爱";
    this.show=false;
    console.log("=====================aaaaa");
    console.log(test)
    console.log(test.target)
    }

  constructor() { }

  ngOnInit() {
    
  }

}

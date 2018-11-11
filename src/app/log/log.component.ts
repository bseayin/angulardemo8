import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  size = 'small';
  
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("日志");
  }

}

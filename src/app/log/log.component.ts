import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { LogService } from './log.service';
import { Dplog } from './dplog';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  size = 'small';
  editCache = {};
  dataSet :Dplog[];
  dataSet2 :Dplog[];
  dataSet3 :Dplog[];

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

  updateEditCache2(): void {
    this.dataSet2.forEach(item => {
      if (!this.editCache[ item.id ]) {
        this.editCache[ item.id ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  updateEditCache3(): void {
    this.dataSet3.forEach(item => {
      if (!this.editCache[ item.id ]) {
        this.editCache[ item.id ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }
  constructor(private sharedService:SharedService,private logService:LogService) { }

  ngOnInit() {
    this.getAllLogs();
    this.getOwnLogs();
    this.getOwnMeetLogs();
    this.sharedService.eventEmit.emit("日志");
  }
  
  // 所有WIKI列表(项目成员wiki列表)
  getAllLogs(): void {
    this.logService.getDplog()
      .subscribe(
        logService => {
                this.dataSet = logService;
                console.log(this.dataSet);
                this.updateEditCache();
        });
  }
  //个人wiki列表(不限项目所有)
  getOwnLogs(): void {
    this.logService.getLog()
      .subscribe(
        logService => {
                this.dataSet2 = logService;
                console.log(this.dataSet2);
                this.updateEditCache2();
        });
  }
  //个人会议WIKI(项目成员可见)
  getOwnMeetLogs(): void {
    this.logService.getLogFlag()
      .subscribe(
        logService => {
                this.dataSet3 = logService;
                console.log(this.dataSet3);
                this.updateEditCache3();
        });
  }
}

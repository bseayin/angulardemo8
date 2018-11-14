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
  constructor(private sharedService:SharedService,private logService:LogService) { }

  ngOnInit() {
    this.getAllLogs();
    this.sharedService.eventEmit.emit("日志");
  }

  getAllLogs(): void {
    this.logService.getDplog()
      .subscribe(
        functionsService => {
                this.dataSet = functionsService;
                console.log(this.dataSet);
                this.updateEditCache();
        });
  }
  
}

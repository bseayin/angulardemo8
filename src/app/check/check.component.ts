import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Task } from '../task';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  editCache = {};
  dataSet: Task[];
  dataSet2: Task[];

  constructor(private sharedService:SharedService, private taskservice: TaskService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("审查");

  }

}

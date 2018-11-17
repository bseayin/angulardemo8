import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Task } from '../task';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css']
})
export class TalkComponent implements OnInit {
  editCache = {};
  dataSet: Task[];

  constructor(private sharedService:SharedService, private taskservice: TaskService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("讨论");
    this.findOwnPassTask();
  }
  findOwnPassTask(): void {
    this.taskservice.findOwnPassTasks()
      .subscribe(
        taskservice => {
          this.dataSet = taskservice
        });
  }

}

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
  dataSet2: Task[];
  

  constructor(private sharedService:SharedService, private taskservice: TaskService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("讨论");
    this.findOwnPassTask();
    this.findOwnNotPassTask();
  }
  findOwnPassTask(): void {
    this.taskservice.findOwnPassTasks()
      .subscribe(
        taskservice => {
           this.dataSet2 = taskservice
        });
  }


  findOwnNotPassTask(): void {
    this.taskservice.findOwnNotPassTasks()
      .subscribe(
        taskservice => {
          console.log("获取未通过");
          console.log(this.dataSet);
          this.dataSet = taskservice;
          this.updateEditCache();
        });
  }
  
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
  }

  saveEdit(id: number): void {
    const index = this.dataSet.findIndex(item => item.id === id);
    Object.assign(this.dataSet[index], this.editCache[id].data);
    // this.dataSet[ index ] = this.editCache[ id ].data;
    this.editCache[id].edit = false;
    this.taskservice.updateTask(this.editCache[id].data).subscribe();
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

}

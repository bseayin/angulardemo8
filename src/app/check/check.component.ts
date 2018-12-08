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
    this.findPassTask();
    this.findNotPassTask();
  }
  ngOnInit2():void{
    this.findPassTask();
    this.findNotPassTask();
  }
  findPassTask(): void {
    this.taskservice.findPassTasks()
      .subscribe(
        taskservice => {
           this.dataSet2 = taskservice
        });
  }


  findNotPassTask(): void {
    this.taskservice.findNotPassTasks()
      .subscribe(
        taskservice => {
          
          this.dataSet = taskservice;
          this.updateEditCache();
        });
        console.log("zheli")
        console.log(this.taskservice);
        console.log(this.dataSet);
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
    this.taskservice.updateTask(this.editCache[id].data).subscribe(() =>this.ngOnInit2());
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

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {TaskService} from './task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tname: string;
  pname: string;
  effort: number;
  inputValue: string;

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  i = 1;
  editCache = {};
  dataSet : Task[];

  constructor(private sharedService: SharedService,private taskservice: TaskService) { }

  findTask(): void {
    this.taskservice.findtasks()
      .subscribe(
        taskservice => {
          this.dataSet = taskservice;
          this.updateEditCache();
        });
  }
  ngOnInit() {
    this.sharedService.eventEmit.emit("任务");
    this.findTask();
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

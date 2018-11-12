import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { TaskService } from './task.service';
import { Task } from '../task';
import { Function } from '../function';
import { Member } from '../member';
import { Sightpoint } from '../sightpoint';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  i = 1;
  editCache = {};
  function: Function[];
  member: Member[];
  sightpoint: Sightpoint[];
  functionname: string;
  membername: string;
  sightname: string;
  dataSet: Task[];

  tname: string;
  pname: string;
  effort: number;
  startdt: Date;
  enddt: Date;
  inputValue: string;
  priority: string;
  type: string;
  status: string;
  difficulty: string;


  isVisible = false;
  showModal(): void {
    this.findFunction();
    this.findMember();
    this.findSightpoint();
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

  constructor(private sharedService: SharedService, private taskservice: TaskService) { }

  findSightpoint(): void {
    this.taskservice.findsightpoint()
      .subscribe(
        taskservice => {
          this.sightpoint = taskservice;
        });
  }

  findMember(): void {
    this.taskservice.findmember()
      .subscribe(
        taskservice => {
          this.member = taskservice;
        });
  }

  findFunction(): void {
    this.taskservice.findfunction()
      .subscribe(
        taskservice => {
          this.function = taskservice;
        });
  }

  findTask(): void {
    this.taskservice.findtasks()
      .subscribe(
        taskservice => {
          this.dataSet = taskservice;
          this.updateEditCache();
        });
  }

  deleteRow(i: number): void {
    const dataSet = this.dataSet.filter(d => d.id !== i);
    this.dataSet = dataSet;
    this.taskservice.deleteTask(i).subscribe(() => console.log('删除成功'));
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

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
  difficulty: number;
  task: Task = new Task();


  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.task.tname = this.tname;
    this.task.projectid = 59;
    this.task.startdt = this.startdt;
    this.task.enddt = this.enddt;
    this.task.effort = this.effort;
    this.task.owner = this.membername;
    this.task.type = this.type;
    this.task.status = this.status;
    this.task.difficulty = this.difficulty;
    this.task.functionname = this.functionname;
    this.task.story = this.sightname;
    this.task.content = this.inputValue;
    this.task.priority = this.priority;
    console.log('Button ok clicked!');
    this.addtask(this.task);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  constructor(private sharedService: SharedService, private taskservice: TaskService) { }

  addtask(task: Task): void {
    this.taskservice.addTask(task)
      .subscribe(
        () => {
          console.log("添加成功");
          this.addRow(task);
        });
  }

  addRow(t: Task): void {
    this.i++;
    this.dataSet = [...this.dataSet, t
    ];
    this.updateEditCache();
  }

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
    this.findFunction();
    this.findMember();
    this.findSightpoint();
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

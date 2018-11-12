import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { SharedService } from '../shared.service';
import {FunctionsService} from './functions.service';
import { Functions } from './functions';
@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {

  i = 1;
  editCacheFunctions = {};
  dataFunctionsSet:Functions[];

  startEditFunctions(id: number): void {
    this.editCacheFunctions[ id ].edit = true;
  }

  cancelEditFunctions(id: number): void {
    this.editCacheFunctions[ id ].edit = false;
  }

  saveEditFunctions(id: number): void {
    const index = this.dataFunctionsSet.findIndex(item => item.id === id);
    Object.assign(this.dataFunctionsSet[ index ], this.editCacheFunctions[ id ].dataFunctionsSet);
    // this.dataSet[ index ] = this.editCache[ id ].dataFunctionsSet;
    this.editCacheFunctions[ id ].edit = false;
  }

  updateEditCacheFunctions(): void {
    this.dataFunctionsSet.forEach(item => {
      if (!this.editCacheFunctions[ item.id ]) {
        this.editCacheFunctions[ item.id ] = {
          edit: false,
          dataFunctions: { ...item }
        };
      }
    });
  }
  constructor(private functionsService:FunctionsService,private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("设置");
    this.getFunctions();
   
  }


  getFunctions(): void {
    this.functionsService.getFunctions()
      .subscribe(
        functionsService => {
          this.dataFunctionsSet = functionsService;
          this.updateEditCacheFunctions();
        });
  }
}

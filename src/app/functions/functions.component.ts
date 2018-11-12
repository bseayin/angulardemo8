import { Component, OnInit } from '@angular/core';
import { Functions } from './functions';
import { FunctionsService } from './functions.service';
@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {
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

  constructor(private functionsService:FunctionsService) { }

  ngOnInit() {
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

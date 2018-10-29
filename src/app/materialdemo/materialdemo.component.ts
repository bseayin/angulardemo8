import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';


@Component({
  selector: 'app-materialdemo',
  templateUrl: './materialdemo.component.html',
  styleUrls: ['./materialdemo.component.css']
})


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})
export class MaterialdemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

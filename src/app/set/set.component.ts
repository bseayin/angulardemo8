import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("设置");
  }

}

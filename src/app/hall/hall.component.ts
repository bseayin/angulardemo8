import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit {
  imgUrl: string = "http://via.placeholder.com/300x100"
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.eventEmit.emit("大厅");
  }

}

import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userid:string='34';
  public eventEmit: any;
  
  constructor() { 
    this.eventEmit = new EventEmitter();
  }
}

import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public eventEmit: any;
  
  constructor() { 
    this.eventEmit = new EventEmitter();
  }
}

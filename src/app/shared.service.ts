import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userid:string='';
  public eventEmit: any;
  
  constructor() { 
    this.eventEmit = new EventEmitter();
  }
}

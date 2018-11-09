import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  path:String='人物';
  update(str:String){
    this.path=str;
  }
  
  constructor() { }
}

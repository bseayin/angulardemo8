import { Injectable,EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class YyhloginService {
  public eventEmit:any;
  private hosturl = 'project4/ceshi';
  constructor(private http: HttpClient,private cookie:CookieService) { 
    this.eventEmit=new EventEmitter();
  }
  
  
  ceshilianjie (): Observable<any>{
    let id=this.cookie.get("loginuid");
    const  hostur4 = 'project4/ceshi/'+id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(hostur4,httpOptions).pipe(
    );
  }

}

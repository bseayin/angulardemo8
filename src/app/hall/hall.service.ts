import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private ws;//WebSocket连接对象
  private prefixUrl = 'ws://localhost:8666/project2/ws/chatRoom/';
  username:string;
  chatContent:string;
    join(): Observable<any> {
      var userName = this.username;
      //创建WebSocket连接对象
      this.ws = new WebSocket(this.prefixUrl + userName);
      var chatContent=this.chatContent;
      return
    }
  constructor(private http: HttpClient) { }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

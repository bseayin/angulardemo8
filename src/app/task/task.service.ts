import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../task';
import { Function } from '../function';
import { Member } from '../member';
import { Sightpoint } from '../sightpoint';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {SharedService} from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private hosturl = 'project1/findtask';  // URL to web api
  private hosturl2 = 'project1/updatetask';  // URL to web api
  private hosturl3 = 'project1/findfunction';  // URL to web api
  private hosturl4 = 'project1/findmember';  // URL to web api
  private hosturl5 = 'project1/findsightpoint';  // URL to web api
  private hosturl6 = 'project1/addtask';
  private hosturl7 = 'project1/findownpasstask';   //老鄢的添加
  private hosturl8 = 'project1/findownnotpasstask';   //老鄢的添加

  //老鄢的添加
  findOwnPassTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.hosturl7)
      .pipe(
        catchError(this.handleError('findOwnPassTasks', []))
      );
  }

  
  // URL to web api
  constructor(private http: HttpClient,private sharedservice:SharedService) { }

  addTask (task: Task): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Task>(this.hosturl6, task, httpOptions).pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }

  findsightpoint(): Observable<Sightpoint[]> {
    return this.http.get<Sightpoint[]>(this.hosturl5)
      .pipe(
        catchError(this.handleError('findsightpoint', []))
      );
  }

  findmember(): Observable<Member[]> {
    return this.http.get<Member[]>(this.hosturl4)
      .pipe(
        catchError(this.handleError('findmember', []))
      );
  }

  findfunction(): Observable<Function[]> {
    return this.http.get<Function[]>(this.hosturl3)
      .pipe(
        catchError(this.handleError('findfunction', []))
      );
  }

  findtasks(): Observable<Task[]> {
    var userid=this.sharedservice.userid;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','AuthenticationInfo': userid })
    };
    return this.http.get<Task[]>(this.hosturl,httpOptions)
      .pipe(
        catchError(this.handleError('findtasks', []))
      );
  }

  /** PUT: update the hero on the server */
  updateTask(task: Task): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.hosturl2, task, httpOptions).pipe(

      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTask(id: number): Observable<any> {
    const hosturl3 = 'project1/deletetask/' + id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(hosturl3, httpOptions).pipe(

      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }





}

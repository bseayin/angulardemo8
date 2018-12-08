import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../task';
import { Function } from '../function';
import { Member } from '../member';
import { Sightpoint } from '../sightpoint';
import { Project } from '../project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {SharedService} from '../shared.service';
import { CookieService } from 'ngx-cookie-service'; 

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
  private hosturl11 = 'project1/findproject';  // URL to web api

  //老鄢的添加1
  findOwnPassTasks(): Observable<Task[]> {
    let pid=this.cookie.get("pid");
    let uid=this.cookie.get("loginuid");
    const hosturl7 = 'project1/findownpasstask/'+pid+"@"+uid;   //老鄢的添加
    console.log(pid);
    console.log(hosturl7);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Task[]>(hosturl7,httpOptions)
      .pipe(
        catchError(this.handleError('findOwnPassTasks', []))
      );
  }
  //老鄢的添加1
  findPassTasks(): Observable<Task[]> {
    let pid=this.cookie.get("pid");
    const hosturl9 = 'project1/findldpasstask/'+pid;   //老鄢的添加
    console.log(pid);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Task[]>(hosturl9,httpOptions)
      .pipe(
        catchError(this.handleError('findPassTasks', []))
      );
  }
  //老鄢的添加1
    findOwnNotPassTasks(): Observable<Task[]> {
      let pid=this.cookie.get("pid");
      let uid=this.cookie.get("loginuid");
      const hosturl8 = 'project1/findownnotpasstask/'+pid+"@"+uid;   //老鄢的添加
      console.log(pid);
      console.log(hosturl8);
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.get<Task[]>(hosturl8,httpOptions)
        .pipe(
          catchError(this.handleError('findOwnNotPassTasks', []))
        );
    } 
    //老鄢的添加
   
    findNotPassTasks(): Observable<Task[]> {
      let pid=this.cookie.get("pid");
      const hosturl10 = 'project1/findldnotpasstask/'+pid;   //老鄢的添加
      console.log(pid);
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.get<Task[]>(hosturl10,httpOptions)
        .pipe(
          catchError(this.handleError('findNotPassTasks', []))
        );
    } 

  
  // URL to web api
  constructor(private http: HttpClient,private sharedservice:SharedService,private cookie:CookieService) { }

  addTask (task: Task): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Task>(this.hosturl6, task, httpOptions).pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }

  findproject(): Observable<Project> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2})
    };
    return this.http.get<Project>(this.hosturl11,httpOptions)
      .pipe(
        catchError(this.handleError('findproject', []))
      );
  }

  findsightpoint(): Observable<Sightpoint[]> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2})
    };
    return this.http.get<Sightpoint[]>(this.hosturl5,httpOptions)
      .pipe(
        catchError(this.handleError('findsightpoint', []))
      );
  }

  findmember(): Observable<Member[]> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2})
    };
    return this.http.get<Member[]>(this.hosturl4,httpOptions)
      .pipe(
        catchError(this.handleError('findmember', []))
      );
  }

  findfunction(): Observable<Function[]> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2})
    };
    return this.http.get<Function[]>(this.hosturl3,httpOptions)
      .pipe(
        catchError(this.handleError('findfunction', []))
      );
  }

  findtasks(): Observable<Task[]> {
    let userid2=this.cookie.get("pid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': userid2})
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

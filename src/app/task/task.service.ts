import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private hosturl = 'project1/findtask';  // URL to web api
  constructor(private http: HttpClient) { }

  findtasks (): Observable<Task[]> {
    return this.http.get<Task[]>(this.hosturl)
      .pipe(
        catchError(this.handleError('findtasks', []))
      );
  }

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

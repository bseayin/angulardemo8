import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../Model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private useresUrl = 'project6/';
  private hosturl = 'project5/createProject'; 

  public eventEmit:any;
  constructor(
    private http: HttpClient
  ) {
    this.eventEmit=new EventEmitter();
   }
   addProject (project: Project): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(project.pname);
    return this.http.put<Project>(this.hosturl, project, httpOptions).pipe(
      catchError(this.handleError<Project>('addProject'))
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

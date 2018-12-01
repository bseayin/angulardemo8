import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable,EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../Model/project';
import { CookieService } from 'ngx-cookie-service'; 


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private hosturl = 'project5/createProject'; 

  public eventEmit:any;
  constructor(
    private http: HttpClient,
    private cookie:CookieService
  ) {
    this.eventEmit=new EventEmitter();
   }
   addProject (project: Project): Observable<Project> {
    let loginuid=this.cookie.get("loginuid");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': loginuid })
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

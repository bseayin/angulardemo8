import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Functions} from './functions'
import { Document} from './document'
import { CookieService } from 'ngx-cookie-service'; 


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private hosturl = 'project3/getAllDoc';
  private hosturl1;
  private hosturl2;
  private hosturl3 = 'project3/savedoc';
  private hosturl4 = 'project3/updateFunction';

  constructor(private http: HttpClient,private cookie:CookieService) { }
  
  downloadDoc():void {
    const pid = parseInt(this.cookie.get("pid"))/8;
    this.hosturl2 =  'project3/downloadDoc/'+pid;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // return this.http.post<void>(this.hosturl2,httpOptions)
    //   .pipe(
    //     catchError(this.handleError('downloadDoc'))
    //   );
    this.http.post(this.hosturl2,'', { responseType: 'blob' }).subscribe((rest: any) => {
              let blob = new Blob([rest], { type: "application/msword" });   
       
      //导出的格式为word
              let objectUrl = URL.createObjectURL(blob);
              let a = document.createElement('a');
              let fileName = '项目文档.docx';
              document.body.appendChild(a);
              a.setAttribute('style', 'display:none');
              a.setAttribute('href', objectUrl);
              a.setAttribute('download', fileName);
              a.click();
              URL.revokeObjectURL(objectUrl);
              setTimeout(() =>  2000);
      
    });
  }

  getFunctions (): Observable<Functions[]> {
    const pid = parseInt(this.cookie.get("pid"))/8;
    this.hosturl1 =  'project3/allFunction/'+pid;
    return this.http.get<Functions[]>(this.hosturl1)
      .pipe(
        catchError(this.handleError('getFunctions', []))
      );
  }

  getDocs (): Observable<Document[]> {
    return this.http.get<Document[]>(this.hosturl)
      .pipe(
        catchError(this.handleError('getFunction', []))
      );
  }

  savedoc (document:Document):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.hosturl3, document, httpOptions).pipe(
      
      catchError(this.handleError<any>('savedoc'))
    );
  }

  updateFunction (functions:Functions):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.hosturl4, functions, httpOptions).pipe(
      
      catchError(this.handleError<any>('updateFunction'))
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

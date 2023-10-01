import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private apiUrl = environment.apiUrl +  "/api/outbreak";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<any> {    
    
    return this.http.get(this.apiUrl + "/signinurl/" + id,      
    {responseType: 'text'}
    )
    .pipe(
      catchError(this.errorHandler)
    );

  }

  getAlbumIndex(album: string): Observable<any> {
      return this.http.get(this.apiUrl + "/album/" + album)      
      .pipe(
      catchError(this.errorHandler)
    );

}

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error);
  }
}

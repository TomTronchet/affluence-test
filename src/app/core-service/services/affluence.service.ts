import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class AffluenceService {
  jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getIdAvailableOnDate(idRessource: number, date: string): Observable<any> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    return this.http.get('http://localhost:8080/resource/' + idRessource  + '/available', {
      params: {
        datetime: date
      }
    })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }


}

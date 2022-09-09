import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'underscore';

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  tel: string,
  acceptTerm: boolean,
  saveInfo: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AffluenceService {
  jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  user: User;

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

  getUser() {
    return this.user;
  }

  setUser(user:User) {
    this.user = user;
  }

}

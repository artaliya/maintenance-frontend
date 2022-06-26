import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private httpClient: HttpClient) {
  }

  getMessage(): Observable<GetResponseMessage> {
    const url = 'http://localhost:8080/api/message';
    return this.httpClient.get<GetResponseMessage>(url).pipe(
      catchError(() => {
        console.log('Error in \'Get message\'');
        return of(null);
      }));
  }
}

interface GetResponseMessage {
  message: string;
}


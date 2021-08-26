import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private token =  "Bearer " + localStorage.getItem('token');
  private baseURL = 'http://meetprep.beta.bitstone.eu/api/v1';
  httpOptions = {
    headers: new HttpHeaders({'security-token': 'test', 'language': 'en',
    'Authorization': this.token})
  };
  nativeElement: any;

  constructor(private http: HttpClient) {
      this.token =  "Bearer " + localStorage.getItem('token');

  }

  getEvents(n: number, page: string): Observable<any> {
    this.token =  "Bearer " + localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({'security-token': 'test', 'language': 'en',
      'Authorization': this.token})
    };
    return this.http.post<any>(this.baseURL + "/events" + page, {event_status: n}, this.httpOptions)
  }


  
  getEventDetails(id: string): Observable<any> {
    this.token =  "Bearer " + localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({'security-token': 'test', 'language': 'en',
      'Authorization': this.token})
    };
    return this.http.get<any>(this.baseURL + "/event/" + id, this.httpOptions);
  }

}

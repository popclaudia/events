import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, of} from 'rxjs';
import { environment } from 'src/environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token =  "Bearer " + localStorage.getItem('token');
  private baseURL = environment.apiHost;
  httpOptions = {
    headers: new HttpHeaders({'security-token': 'test', 'language': 'en',
    'Authorization': this.token})
  };
  nativeElement: any;

  constructor(private http: HttpClient) {
      this.token =  "Bearer " + localStorage.getItem('token');

  }

  login(email: string, password: string): Observable<any> {
    const userCredentials: User = {email: email, password: password};
    return this.http.post<any>(this.baseURL + "/login", userCredentials, this.httpOptions)

  }

  logout(): Observable<any> {
    this.token =  "Bearer " + localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({'security-token': 'test', 'language': 'en',
      'Authorization': this.token})
    };
    return this.http.post<any>(this.baseURL + "/logout", {}, this.httpOptions)
  }

}

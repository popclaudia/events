import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpResponse } from '@angular/common/http';
import { User } from './user';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginURL = 'http://meetprep.beta.bitstone.eu/api/v1/login';
  httpOptions = {
    headers: new HttpHeaders({'security-token': 'test', 'language': 'en'})
  };
  nativeElement: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const userCredentials: User = {email: email, password: password};
    console.log(userCredentials);
    return this.http.post<any>(this.loginURL, userCredentials, this.httpOptions)

  }

}

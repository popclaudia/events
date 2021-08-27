import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = (localStorage.getItem('token') != null);
  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(): Observable<boolean> {
    return of(localStorage.getItem('token') != null).pipe(
      tap(() => this.isLoggedIn = (localStorage.getItem('token')!=null))
    );
  }

  
  logout(): void {
    localStorage.clear();
    this.isLoggedIn = (localStorage.getItem('token') != null);
    
  }
}

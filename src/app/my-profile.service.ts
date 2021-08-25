import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  user = '';
  private token =  "Bearer " + localStorage.getItem('token');
  private baseURL = 'http://meetprep.beta.bitstone.eu/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({'security-token': 'test', 'language': 'en',
    'Authorization': this.token})
  };
  constructor(private http: HttpClient) {
    this.token =  "Bearer " + localStorage.getItem('token');
    this.user = localStorage.getItem('user-data') || "{}";
    this.user = JSON.parse(this.user).user.id

}

  getUserData(): Observable<any[]> {
    
    return this.http.get<any[]>(this.baseURL+'user/'+ this.user, this.httpOptions);
  }


  postUserImage(formData: FormData): Observable<any[]> {
    console.log(formData)
    return this.http.post<any[]>(this.baseURL+'upload', formData,this.httpOptions);
  }


  putUserImage(url: string){
    const params={avatar_url: url}; 
    return this.http.put<any[]>(this.baseURL+'user/'+ this.user,params, this.httpOptions)
  }
  
}

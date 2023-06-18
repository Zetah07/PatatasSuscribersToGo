import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  [x: string]: any;
  private baseUrl = 'https://lab.app.invertebrado.co/api';
  private token: string = '';
  private headers = new HttpHeaders();
  private Username: string = '';

  constructor(private http: HttpClient) {}


  setToken(token: string) {
    this.token = token;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  getToken(): string {
    return this.token;
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      UserName: username,
      Password: password,
    };

    return this.http.post<any>(`${this.baseUrl}/account/login`, loginData).pipe(
      tap((resp) =>{
        this.Username = resp.FirstName+' '+resp.LastName;
        console.log('tukituki', resp);
      }
    ));
  }

  getUserName(): string {
    return this.Username;
  }

  getSubscribers(
    criteria: string,
    page: number,
    count: number,
    sortOrder: string,
    sortType: number
  ) {

    const params = new HttpParams()
      .set('criteria', criteria)
      .set('page', page)
      .set('count', count)
      .set('sortOrder', sortOrder)
      .set('sortType', sortType);
    return this.http.get<any>(`${this.baseUrl}/subscribers`, {headers: this.headers, params});
  }

  getSubscriberById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/subscribers/${id}`, {headers: this.headers});
  }

  createSubscribers(subscribers: any[]) {
    return this.http.post<any>(`${this.baseUrl}/subscribers/`, { Subscribers: subscribers });
  }

  deleteSubscriberById(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/subscribers/${id}`);
  }
  
  updateSubscriberById(id: number, subscriber: any) {
    return this.http.put<any>(`${this.baseUrl}/subscribers/${id}`, subscriber);
  }

  getCountries(
    criteria: string, 
    page: number,
    count: number,
    sortOrder: string,
    sortType: number
    ){
      const params = {
        criteria: criteria,
        page: page.toString(),
        count: count.toString(),
        sortOrder: sortOrder,
        sortType: sortType.toString()
      };
      return this.http.get<any>(`${this.baseUrl}/countries`, {params: params});
    }
}

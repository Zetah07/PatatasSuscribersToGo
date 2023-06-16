import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  [x: string]: any;
  private baseUrl = 'https://lab.app.invertebrado.co/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = {
      UserName: username,
      Password: password,
    };
    return this.http.post<any>(`${this.baseUrl}/account/login`, loginData);
  }

  getSubscribers(
    criteria: string,
    page: number,
    count: number,
    sortOrder: string,
    sortType: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('page', page.toString())
      .set('count', count.toString())
      .set('sortOrder', sortOrder)
      .set('sortType', sortType.toString());

    return this.http.get(`${this.baseUrl}subscribers`, { params });
  }

  getSubscriberById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/subscribers/${id}`);
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

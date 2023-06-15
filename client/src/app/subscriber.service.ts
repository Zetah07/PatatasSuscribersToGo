import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private baseUrl = 'https://lab.app.invertebrado.co/api/';

  constructor( private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.baseUrl + 'account/login', credentials);
  }

  getSubscribers(): Observable<any> {
    return this.http.get(this.baseUrl + 'subscribers');
  }

  getSubscriberById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'subscribers/' + id);
  }

  createSubscriber(subscriberData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'subscribers', subscriberData);
  }

  deleteSubscriber(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'subscribers/' + id);
  }

  updateSubscriber(id: string, subscriberData: any): Observable<any> {
    return this.http.put(this.baseUrl + 'subscribers/' + id, subscriberData);
  }

}

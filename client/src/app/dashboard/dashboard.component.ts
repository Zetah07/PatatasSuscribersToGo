import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SubscriberExample } from '../dataExample';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  subscribers: any[] = [];
  subscribersExample: any[] = [];
  subscriberDetails: any = {};
  username: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getSubscribers();
    this.subscribersExample = SubscriberExample.Data;
    this.subscriberDetails = this.getSubscriberById(7914);
    this.username = this.apiService.getUserName();
  }
  getSubscribers() {
    this.apiService.getSubscribers('Carlos', 1, 2, 'PublicId', 0).subscribe((response) => {
      this.subscribers = response.Data;
      console.log('data', response.Data);
      console.log('count', response.Count);
    }, 
    (error: any) => {
      console.log('getSubscribers', error);
    });
  }

  getSubscriberById(id: number) {
    try {
      this.apiService.getSubscriberById(id).subscribe((response) => {
        this.subscriberDetails = response;

        console.log(response);

      });
    } catch (error) {
      console.error(error);
    }
  }

  showSubscriberDetails(Id: number) {
    this.subscriberDetails = this.subscribersExample.find((s) => s.Id === Id);
  }

  logout() {
    this.router.navigate(['/login']);
  }
  // getCountries() {
  //   this.apiService.getCountries().subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  }
  
// }

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  subscribers: any[] = [];
  subscriberDetails: any = {};

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSubscribers();
  }
  getSubscribers() {
    try{
    this.apiService.getSubscribers('', 1, 10, 'asc', 0).subscribe((data) => {
      this.subscribers = data;
    });
  }catch(error){
    console.error(error);
    }
  }

  getSubscriberById(id: number) {
    try {
      this.apiService.getSubscriberById(id).subscribe((data) => {
        this.subscriberDetails = data;
      });
    } catch (error) {
      console.error(error);
    }
  }
  
}

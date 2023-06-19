import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit{
  @ViewChild('navbar') navbar: NavbarComponent | undefined;

  subscribers: any[] = [];
  username: any;
  subscriberDetails: any = [];
  selectedSubscriber: any;
  isModalOpen: boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getSubscribers();
  }



  getSubscribers() {
    this.apiService
      .getSubscribers('', 1, 50, 'PublicId', 0)
      .then((response: any) => {
        if (Array.isArray(response.Data)) {
          this.subscribers = response.Data;
          console.log(this.subscribers);
        } else {
          console.error('Invalid response data. Expected an array.');
        }
      })
      .catch((error: any) => console.error(error));
  }

  getSubscriberById(Id: number) {
      this.subscriberDetails = this.subscriberDetails.find((sub: { Id: any; }) => sub.Id === Id);
  }

  openModal(subscriber: any) {
    this.selectedSubscriber  = subscriber;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedSubscriber = null;
    this.isModalOpen = false;
  }

  }
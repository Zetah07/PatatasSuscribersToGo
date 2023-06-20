import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit{

  subscribers: any[] = [];
  subscriberDetails: any = [];
  selectedSubscriber: any;
  isModalOpen: boolean = false;
  isModalDeleteOpen: boolean = false;
  isConfirmationStep: boolean = false;
  selectedSubscriberId!: number;
  

  constructor(
    private apiService: ApiService, 
    private router: Router, 
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    const storedToken = localStorage.getItem('authToken'); 
  if (storedToken) {
    this.apiService.setToken(storedToken);
    this.getSubscribers();
  }
    this.apiService.getCountries(
      {
        criteria: '',
        page: 1,
        count: 255,
      }
      );
  }

  getSubscribers() {
    const storedToken: string | null = localStorage.getItem('token');
    if (storedToken) {
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
    } else {
      console.error('Token not found in localStorage.');
    }
  }

  getSubscriberById(Id: number) {
      this.subscriberDetails = this.subscriberDetails.find((sub: { Id: any; }) => sub.Id === Id);
  }
  
  getUpdatedSubscribers(id: number) {
    this.router.navigate(['/update', id]);
  }
  
  deleteSubscriber(id: number) {
    this.apiService
      .deleteSubscriberById(id)
      .then((response: any) => {
          this.getSubscribers();
          this.toastr.success('Suscriptor eliminado exitosamente', 'Éxito');
          this.closeModaldel();
      })
      .catch((error: any) => {
        console.error(error);
        this.toastr.error('No se pudo eliminar el suscriptor', 'Error');
        this.closeModal();
      });
  }
  
  Modaldelete(id: number) {
    this.selectedSubscriberId = id;
    this.isModalDeleteOpen = true;
  }
  closeModaldel() {
    this.isModalDeleteOpen = false;
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
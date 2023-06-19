import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { ApiService } from '../../api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  subscriberId!: number;
  subscriber: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscriberId = this.route.snapshot.params['id'];
    this.getSubscriberDetails();
  }
  async getSubscriberDetails() {
    try {
      this.subscriber = await this.apiService.getSubscriberById(this.subscriberId);
    } catch (error) {
      console.error(error);
    }
  }

  async updateSubscriber() {
    try {
      await this.apiService.updateSubscriberById(this.subscriberId, this.subscriber);
      this.toastr.success('Suscriptor actualizado exitosamente', 'Éxito');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
      this.toastr.error('No se pudo actualizar el suscriptor', 'Error');
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
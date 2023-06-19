import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  subscriberForm!: FormGroup;
  
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService, 
    private toastr: ToastrService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriberForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Country: ['', Validators.required],
      JobTitle: [''],
      Area: [''],
      Topics: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.subscriberForm.valid) {
      const formData = this.subscriberForm.value;
      this.apiService.createSubscribers(formData)
      .then((response: any) => {
        console.log('.then: response ', response);
        this.toastr.success('Suscriptor creado exitosamente', 'Éxito');
        this.subscriberForm.reset();
      }).catch((error: any) => {
        console.log('.catch: error ', error);
        this.toastr.error('No se pudo crear el suscriptor', 'Error');
      });
      } else{
        console.error('Invalid form data');
      }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}

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
      CountryCode: ['', Validators.required],
      Country: ['', Validators.required],
      JobTitle: [''],
      Area: [''],
      Topics: [''],
    });
  }

  onSubmit() {
    if (this.subscriberForm.valid) {
      const formData = {
        name: this.subscriberForm.value.Name,
        email: this.subscriberForm.value.Email,
        phoneNumber: this.subscriberForm.value.PhoneNumber,
        countryCode: this.subscriberForm.value.CountryCode.toUpperCase().substring(2, 3),
        country: this.subscriberForm.value.Country,
        jobTitle: this.subscriberForm.value.JobTitle,
        area: this.subscriberForm.value.Area,
        topics: this.subscriberForm.value.Topics,
      };

      this.apiService.addSubscriber(formData).then(
        (response: any) => {
          console.log('Response:', response);
          this.toastr.success('Suscriptor creado exitosamente', 'Éxito');
          this.subscriberForm.reset();
        },
        (error: any) => {
          console.log('Error:', error);
          this.toastr.error('No se pudo crear el suscriptor', 'Error');
        }
      );
    } else {
      console.error('Invalid form data');
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}

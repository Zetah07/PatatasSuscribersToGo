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
  code!: number;
  nameCountry!: string;
  countryOptions: any[] = []; 
  countrySelected!: string;
  countryCodeSeleted!: string;

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
      // CountryCode: ['', Validators.required, Validators.maxLength(2)],
      JobTitle: [''],
      Area: [''],
      Topics: [''],
    });

    this.countryOptions = this.apiService.getCountryOptions();
    console.log('que llega de aqui', this.countryOptions);
  }

  onSubmit() {
    if (this.subscriberForm.valid) {
      const formData = {
        Subscribers: [
          {
            Name: this.subscriberForm.value.Name,
            Email: this.subscriberForm.value.Email,
            PhoneNumber: this.subscriberForm.value.PhoneNumber,
            CountryCode: this.countryCodeSeleted,
            Country: this.countrySelected,
            JobTitle: this.subscriberForm.value.JobTitle,
            Area: this.subscriberForm.value.Area,
            Topics: [],
          },
        ],
      };

      this.apiService.addSubscriber(formData).then(
        (response: any) => {
          console.log('Response:', response);
          this.toastr.success('Suscriptor creado exitosamente', 'Éxito');
          this.subscriberForm.reset();
          this.goHome();
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

  onCountryChange(event: any): void {
    console.log('pais seleccionado ', event)
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}

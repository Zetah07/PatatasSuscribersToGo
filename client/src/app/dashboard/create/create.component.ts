import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  subscriberForm!: FormGroup;
  // isLoading: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.subscriberForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      jobTitle: [''],
      area: [''],
      topics: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    // this.isLoading = true;
    if (this.subscriberForm?.valid) {
      const formData = this.subscriberForm?.value;
      this.apiService.createSubscribers(formData)
      .then((response: any) => {
        console.log('.then: response ', response);
        // this.isLoading = false;
        this.subscriberForm?.reset();
      })
      } else{
        console.error('Invalid form data');
      }
  }
}

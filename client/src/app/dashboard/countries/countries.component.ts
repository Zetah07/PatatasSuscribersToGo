import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries!: any[];
  searchCriteria: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    const params = {
      criteria: '',
      page: 1,
      count: 255,
    };

    this.apiService.getCountries(params)
      .then((response: any) => {
        this.countries = response.Data;
        console.log('Countries:', this.countries);
      })
      .catch((error: any) => {
        console.log('Error:', error);
      });
  }

  searchCountries() {
    this.getCountries(); 
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}

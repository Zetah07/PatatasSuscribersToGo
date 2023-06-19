import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: any;

  constructor(
    private apiService: ApiService, 
    private router: Router, 
    ) { }

  ngOnInit(): void {
    this.username = this.apiService.getUserName();
  }

  logout() {
    this.router.navigate(['/login']);
  }

}

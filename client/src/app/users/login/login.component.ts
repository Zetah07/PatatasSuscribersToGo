import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginForm: FormGroup;
  token: string = '';
  message: string  = '';
  

  constructor(private apiService: ApiService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async onLogin() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.apiService.login(username, password)
      .then((response: any) => {
        this.token = response.token;
        this.router.navigate(['/home']);
      })
    }
}
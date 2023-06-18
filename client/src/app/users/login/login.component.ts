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

  onLogin() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

      this.apiService.login(username, password).subscribe(
        (data: any) => {
          this.apiService.setToken(data.Token);
            console.log('data', data);
  
          this.router.navigate(['/home']);
        },
        (error: any) => {
        console.log('el error tal', error);
        // this.message = error
        }
      );
    }
}
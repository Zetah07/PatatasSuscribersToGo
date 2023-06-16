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

  constructor(private apiService: ApiService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async onLogin() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    try {
      const data: { token: string } = await this.apiService.login(username, password).toPromise();
      this.token = data.token;
      console.log(data);

      this.apiService.login(username, password).subscribe(
        (data: { token: string }) => {
          this.token = data.token;
          console.log(data);
  
          this.router.navigate(['/home']);
        },
      );
    }
    catch (error) {
      console.error('There was an error!', error);
    }
  }
}
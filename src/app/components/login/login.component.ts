import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (private _formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {}

  loginForm = this._formBuilder.group({
    username: this._formBuilder.control('', Validators.required),
    password: this._formBuilder.control('', Validators.required),
  });

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('access_token', res.access_token);
          this.router.navigate(['']);
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    }
  }
}

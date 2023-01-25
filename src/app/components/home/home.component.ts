import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor (private _formBuilder: FormBuilder, private apiService: ApiService) {}

  tokenForm = this._formBuilder.group({
    token: this._formBuilder.control('', Validators.required),
  });

  licenseCode = '';
  expireDate = '';

  onSubmit() {
    this.apiService.getLicenseCode(this.tokenForm.value.token!).subscribe({
      next: (res) => {
        this.licenseCode = res.licenseCode;
        this.expireDate = res.expire;
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor (private _formBuilder: FormBuilder) {}

  tokenForm = this._formBuilder.group({
    token: this._formBuilder.control('', Validators.required),
  });

  licenseCode = '';

  onSubmit() {
    // TODO: Отправка http запроса
    console.log(this.tokenForm.value);
    this.licenseCode = 'SWhBaUZNVENCbWpSSFl1Tk0wQm9VUFJxRU5nVUUrWXNiTmd6TEJrZ2lHcFpXRUozWVRKV05VMVRRalZaV0d4b0xtSTBZamsxWTJWaE1UQmlZbVU0TlRFek9HVTJNakEyT1RSak1XUTFOR1UyTGsxcVFYbE5lVEIzVFZNd2VFMUJQVDB1LkZ5UVhKUFh5UGxycEs3MjFWU01LWU1kVEllOXhjWU1lRHVGVkhpRkQ2dzQ9';
  }
}

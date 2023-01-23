import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  constructor (
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public editData: any,
  ) {}

  ngOnInit(): void {
    if (this.editData) {
      this.isUpdate = true;
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['password'].removeValidators(Validators.required);
      this.userForm.controls['role'].setValue(this.editData.role);
    }
  }

  public isUpdate = false;

  userForm = this._formBuilder.group({
    username: this._formBuilder.control('', Validators.required),
    password: this._formBuilder.control('', Validators.required),
    role: this._formBuilder.control('user', Validators.required),
  });

  createUser() {
    // console.log(this.userForm.value);

    if (this.userForm.valid) {
      this.apiService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          alert('Success!');
          this.userForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    }
  }

  updateUser() {
    const updateUserData = {
      id: this.editData.id,
      username: this.userForm.value.username?.replace(/\s/g, '') || this.editData.username,
      password: this.userForm.value.password,
      role: this.userForm.value.role,
    }

    if (!updateUserData.password) {
      delete updateUserData.password;
    }

    this.apiService.updateUser(updateUserData).subscribe({
      next: (res) => {
        alert('Success!');
        this.userForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
  }
}

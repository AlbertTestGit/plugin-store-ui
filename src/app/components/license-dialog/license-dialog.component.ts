import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss']
})
export class LicenseDialogComponent implements OnInit {
  constructor (
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<LicenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public editData: any,
  ) {}

  ngOnInit(): void {
    console.log(this.editData);
    if (this.editData) {
      this.licenseForm.controls['userId'].setValue(this.editData.user.id);
      this.licenseForm.controls['swid'].setValue(this.editData.row.productKey);
      this.licenseForm.controls['count'].setValue(this.editData.row.unusedLicenses);
    }
  }

  licenseForm = this._formBuilder.group({
    userId: this._formBuilder.control('', Validators.required),
    swid: this._formBuilder.control('', Validators.required),
    count: this._formBuilder.control('', Validators.required),
  });

  updateUserLicense() {
    const userLicensesData = {
      swid: this.licenseForm.value.swid,
      userId: this.licenseForm.value.userId,
      count: this.licenseForm.value.count,
    }

    this.apiService.updateUserLicenses(userLicensesData).subscribe({
      next: (res) => {
        alert('Success!');
        this.licenseForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
}

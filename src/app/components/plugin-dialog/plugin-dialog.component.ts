import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-plugin-dialog',
  templateUrl: './plugin-dialog.component.html',
  styleUrls: ['./plugin-dialog.component.scss']
})
export class PluginDialogComponent {
  constructor (
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<PluginDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public editData: any,
  ) {}

  ngOnInit(): void {
    console.log(this.editData)
    if (this.editData) {
      this.isUpdate = true;
      this.pluginForm.controls['name'].setValue(this.editData.name);
      this.pluginForm.controls['petrelVersion'].setValue(this.editData.petrelVersion);
    }
  }

  public isUpdate = false;

  pluginForm = this._formBuilder.group({
    name: this._formBuilder.control('', Validators.required),
    petrelVersion: this._formBuilder.control('', Validators.required),
  });

  createPlugin() {
    // console.log(this.userForm.value);

    if (this.pluginForm.valid) {
      this.apiService.createPlugin(this.pluginForm.value).subscribe({
        next: (res) => {
          alert('Success!');
          this.pluginForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    }
  }

  updatePlugin() {
    const updatePluginData = {
      id: this.editData.id,
      name: this.pluginForm.value.name,
      petrelVersion: this.pluginForm.value.petrelVersion,
    }

    this.apiService.updatePlugin(updatePluginData).subscribe({
      next: (res) => {
        alert('Success!');
        this.pluginForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
  }
}

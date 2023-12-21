import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-voter-name-dialog',
  templateUrl: './voter-name-dialog.component.html',
  styleUrl: './voter-name-dialog.component.css'
})
export class VoterNameDialogComponent {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dialogRef: MatDialogRef<VoterNameDialogComponent>,
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      name: [this.data, Validators.required]
    });
  }

  public onLeave() {
    this.dialogRef.close();
  }

  public onSubmit() {
    const name = this.form.get('name')!.value;

    this.dialogRef.close(name);
  }
}

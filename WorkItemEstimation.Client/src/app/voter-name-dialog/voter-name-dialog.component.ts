import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-voter-name-dialog',
  templateUrl: './voter-name-dialog.component.html',
  styleUrl: './voter-name-dialog.component.css'
})
export class VoterNameDialogComponent {

  form: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required]
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

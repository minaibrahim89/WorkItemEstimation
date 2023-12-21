import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Room } from '../model/room';
import { RoomCreatedDialogComponent } from '../room-created-dialog/room-created-dialog.component';
import { AllowedValuesSet, FIBONACCI, SHIRT_SIZES } from './model';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  defaultAllowedValuesSets: AllowedValuesSet[] = [FIBONACCI, SHIRT_SIZES];

  form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      allowedValues: [[], [Validators.required, Validators.minLength(2)]]
    })
  }

  public onAllowedValuesSelected(evt: MatSelectionListChange) {
    this.form.get('allowedValues')!.setValue(evt.options[0].value);
  }

  public onCancel() {
    this.router.navigate(['/']);
  }

  public onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.showRoomCreatedDialog({
      id: '924aa02a-b2df-4cce-b4ac-1e8804447bcb',
      name: <string>this.form.get('name')!.value,
      allowedValues: <string[]>this.form.get('allowedValues')!.value
    } as Room);
  }

  private showRoomCreatedDialog(room: Room) {
    const dialogRef = this.dialog.open(RoomCreatedDialogComponent, {
      data: room
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(roomId => {
        if (roomId) {
          this.router.navigate(['/room', roomId]);
        }
      });
  }
}

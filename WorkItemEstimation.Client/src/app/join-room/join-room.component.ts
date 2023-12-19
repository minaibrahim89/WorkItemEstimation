import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { RoomCreatedDialogComponent } from '../room-created-dialog/room-created-dialog.component';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {

  form: FormGroup;

  constructor(private dialog: Dialog,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      roomId: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  public createRoom(): void {
    const dialogRef = this.dialog.open(RoomCreatedDialogComponent);

    dialogRef.closed
      .pipe(take(1))
      .subscribe(roomId => {
        if (roomId) {
          this.form?.patchValue({ roomId: <string>roomId });
        }
      });
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}

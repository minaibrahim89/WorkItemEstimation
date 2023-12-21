import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { RoomCreatedDialogComponent } from '../room-created-dialog/room-created-dialog.component';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {

  form: FormGroup;

  constructor(private dialog: Dialog,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      roomId: ['', Validators.required],
    });
  }

  get roomId(): string {
    return this.form.get('roomId')?.value ?? "";
  }

  public createRoom(): void {
    const dialogRef = this.dialog.open(RoomCreatedDialogComponent);

    dialogRef.closed
      .pipe(take(1))
      .subscribe(roomId => {
        if (roomId) {
          this.setRoomId(<string>roomId);
          this.join();
        }
      });
  }

  private setRoomId(roomId: string) {
    this.form?.patchValue({ roomId });
  }

  onSubmit() {
    if (this.form.valid) {
      this.join();
    }
  }

  private join() {
    this.router.navigate(['/room', this.roomId]);
  }
}

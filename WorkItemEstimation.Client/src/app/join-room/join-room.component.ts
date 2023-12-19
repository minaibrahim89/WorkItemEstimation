import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { RoomCreatedDialogComponent } from '../room-created-dialog/room-created-dialog.component';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

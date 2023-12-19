import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { RoomCreatedDialogComponent } from '../room-created-dialog/room-created-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {

  roomId = '';
  name = '';

  constructor(private dialog: Dialog) {
  }

  public createRoom(): void {
    const dialogRef = this.dialog.open(RoomCreatedDialogComponent);

    dialogRef.closed
      .pipe(take(1))
      .subscribe(roomId => {
        if (roomId) {
          this.roomId = <string>roomId;
        }
      });
  }
}

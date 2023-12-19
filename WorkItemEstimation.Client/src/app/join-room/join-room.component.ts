import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { RoomCreatedDialogComponent } from '../room-created-dialog/room-created-dialog.component';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {

  constructor(private dialog: Dialog) {
  }

  public createRoom(): void {
    this.dialog.open(RoomCreatedDialogComponent);
  }
}

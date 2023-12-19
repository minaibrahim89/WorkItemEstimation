import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-created-dialog',
  templateUrl: './room-created-dialog.component.html',
  styleUrl: './room-created-dialog.component.css'
})
export class RoomCreatedDialogComponent {

  roomId = '924aa02a-b2df-4cce-b4ac-1e8804447bcb';
  inviteUrl = 'http://localhost:4200/rooms/' + this.roomId;

  constructor(private dialogRef: DialogRef) {
  }

  public onJoin() {
    this.dialogRef.close(this.roomId);
  }

  public onClose() {
    this.dialogRef.close();
  }
}

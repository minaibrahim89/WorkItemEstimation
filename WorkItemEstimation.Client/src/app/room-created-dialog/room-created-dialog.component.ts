import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Room } from '../model/room';

@Component({
  selector: 'app-room-created-dialog',
  templateUrl: './room-created-dialog.component.html',
  styleUrl: './room-created-dialog.component.css'
})
export class RoomCreatedDialogComponent {

  roomId = '';
  inviteUrl = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Room,
    private dialogRef: MatDialogRef<RoomCreatedDialogComponent>,
    private clipboard: Clipboard) {
      this.roomId = data.id;
      this.inviteUrl = 'http://localhost:4200/room/' + this.roomId;
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
  }

  public onJoin() {
    this.dialogRef.close(this.roomId);
  }

  public onClose() {
    this.dialogRef.close();
  }
}

import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-created-dialog',
  templateUrl: './room-created-dialog.component.html',
  styleUrl: './room-created-dialog.component.css'
})
export class RoomCreatedDialogComponent {
  constructor(private dialogRef: DialogRef) {
  }

  public close() {
    this.dialogRef.close();
  }
}

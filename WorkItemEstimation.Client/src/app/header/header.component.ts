import { Component } from '@angular/core';
import {Dialog, DialogModule, DialogRef} from '@angular/cdk/dialog';
import { RoomCreatedDialogComponent } from '../room-created-dialog/room-created-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private dialog: Dialog) {
  }

  public createRoom(): void {
    this.dialog.open(RoomCreatedDialogComponent);
  }
}

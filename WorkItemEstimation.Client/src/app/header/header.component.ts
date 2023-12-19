import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
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

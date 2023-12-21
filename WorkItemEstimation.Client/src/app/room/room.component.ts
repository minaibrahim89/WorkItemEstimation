import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { VoterNameDialogComponent } from '../voter-name-dialog/voter-name-dialog.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {

  private _roomId = '';
  voterName = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: Dialog) {
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(take(1))
      .subscribe(params => this.onRoomEnter(params['roomId']));
  }

  private onRoomEnter(roomId: string) {
    console.log('on room enter:', roomId);
    this._roomId = roomId;
    this.voterName = this.getVoterName() ?? '';

    if (!this.voterName) {
      const dialogRef = this.dialog.open(VoterNameDialogComponent);

      dialogRef.closed
        .pipe(take(1))
        .subscribe(name => {
          if (name) {
            this.setVoterName(<string>name!);
          } else {
            this.router.navigateByUrl('/');
          }
        })
    }
  }

  private getVoterName(): string | null {
    const key = this.voterNameStorageKey();
    return localStorage.getItem(key) as string;
  }

  private setVoterName(name: string) {
    const key = this.voterNameStorageKey();
    localStorage.setItem(key, name);

    this.voterName = name;
  }

  private voterNameStorageKey(): string {
    return `voter@${this._roomId}`;
  }
}

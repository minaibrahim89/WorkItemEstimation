import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {

  form: FormGroup;

  constructor(
    private router: Router,
    formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      roomId: ['', Validators.required],
    });
  }

  get roomId(): string {
    return this.form.get('roomId')?.value ?? "";
  }

  createRoom() {
    this.router.navigate(['/create-room']);
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

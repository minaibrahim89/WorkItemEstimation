import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomCreatedDialogComponent } from './room-created-dialog/room-created-dialog.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoomComponent } from './room/room.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JoinRoomComponent,
    RoomCreatedDialogComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

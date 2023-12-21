import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomComponent } from './room/room.component';
import { CreateRoomComponent } from './create-room/create-room.component';

const routes: Routes = [
  {
    path: 'create-room',
    component: CreateRoomComponent
  },
  {
    path: 'room/:roomId',
    component: RoomComponent
  }, {
    path: '',
    pathMatch: 'full',
    component: JoinRoomComponent
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

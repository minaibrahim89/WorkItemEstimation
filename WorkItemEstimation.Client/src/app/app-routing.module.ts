import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: JoinRoomComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

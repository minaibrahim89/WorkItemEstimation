import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreatedDialogComponent } from './room-created-dialog.component';

describe('RoomCreatedDialogComponent', () => {
  let component: RoomCreatedDialogComponent;
  let fixture: ComponentFixture<RoomCreatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomCreatedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomCreatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

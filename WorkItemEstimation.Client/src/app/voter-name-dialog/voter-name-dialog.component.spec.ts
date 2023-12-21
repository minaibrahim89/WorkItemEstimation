import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterNameDialogComponent } from './voter-name-dialog.component';

describe('VoterNameDialogComponent', () => {
  let component: VoterNameDialogComponent;
  let fixture: ComponentFixture<VoterNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoterNameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

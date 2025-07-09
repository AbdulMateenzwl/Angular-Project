import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffModeScreenComponent } from './off-mode-screen.component';

describe('OffModeScreenComponent', () => {
  let component: OffModeScreenComponent;
  let fixture: ComponentFixture<OffModeScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffModeScreenComponent]
    });
    fixture = TestBed.createComponent(OffModeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsMenuComponent } from './habits-menu.component';

describe('HabitsMenuComponent', () => {
  let component: HabitsMenuComponent;
  let fixture: ComponentFixture<HabitsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitsMenuComponent]
    });
    fixture = TestBed.createComponent(HabitsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

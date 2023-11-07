import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalIconComponent } from './medal-icon.component';

describe('MedalIconComponent', () => {
  let component: MedalIconComponent;
  let fixture: ComponentFixture<MedalIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedalIconComponent]
    });
    fixture = TestBed.createComponent(MedalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

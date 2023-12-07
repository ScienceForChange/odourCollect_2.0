import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackBtnComponent } from './back-btn.component';
import { SharedComponentsModule } from '../shared.components.module';

describe('BackBtnComponent', () => {
  let component: BackBtnComponent;
  let fixture: ComponentFixture<BackBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule],
      declarations: [BackBtnComponent]
    });
    fixture = TestBed.createComponent(BackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

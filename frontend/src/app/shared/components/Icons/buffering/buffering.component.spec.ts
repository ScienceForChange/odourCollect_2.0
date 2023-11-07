import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferingComponent } from './buffering.component';

describe('BufferingComponent', () => {
  let component: BufferingComponent;
  let fixture: ComponentFixture<BufferingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BufferingComponent]
    });
    fixture = TestBed.createComponent(BufferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsOffcanvaComponent } from './comments-offcanva.component';

describe('CommentsOffcanvasComponent', () => {
  let component: CommentsOffcanvaComponent;
  let fixture: ComponentFixture<CommentsOffcanvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsOffcanvaComponent]
    });
    fixture = TestBed.createComponent(CommentsOffcanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

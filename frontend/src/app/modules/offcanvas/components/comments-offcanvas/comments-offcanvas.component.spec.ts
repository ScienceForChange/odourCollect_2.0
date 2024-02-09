import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsOffcanvasComponent } from './comments-offcanvas.component';

describe('CommentsOffcanvasComponent', () => {
  let component: CommentsOffcanvasComponent;
  let fixture: ComponentFixture<CommentsOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsOffcanvasComponent],
    });
    fixture = TestBed.createComponent(CommentsOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

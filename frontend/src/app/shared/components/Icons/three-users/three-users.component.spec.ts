import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeUsersComponent } from './three-users.component';

describe('ThreeUsersComponent', () => {
  let component: ThreeUsersComponent;
  let fixture: ComponentFixture<ThreeUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeUsersComponent]
    });
    fixture = TestBed.createComponent(ThreeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

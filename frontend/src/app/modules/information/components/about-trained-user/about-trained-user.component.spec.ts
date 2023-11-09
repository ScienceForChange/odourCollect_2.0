import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTrainedUserComponent } from './about-trained-user.component';

describe('AboutTrainedUserComponent', () => {
  let component: AboutTrainedUserComponent;
  let fixture: ComponentFixture<AboutTrainedUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutTrainedUserComponent]
    });
    fixture = TestBed.createComponent(AboutTrainedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

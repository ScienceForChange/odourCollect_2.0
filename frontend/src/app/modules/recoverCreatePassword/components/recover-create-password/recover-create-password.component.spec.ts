import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverCreatePasswordComponent } from './recover-create-password.component';

describe('RecoverCreatePasswordComponent', () => {
  let component: RecoverCreatePasswordComponent;
  let fixture: ComponentFixture<RecoverCreatePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverCreatePasswordComponent]
    });
    fixture = TestBed.createComponent(RecoverCreatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

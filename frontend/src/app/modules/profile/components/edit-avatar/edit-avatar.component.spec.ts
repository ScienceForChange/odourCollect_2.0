import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvatarComponent } from './edit-avatar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditAvatarComponent', () => {
  let component: EditAvatarComponent;
  let fixture: ComponentFixture<EditAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [EditAvatarComponent]
    });
    fixture = TestBed.createComponent(EditAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

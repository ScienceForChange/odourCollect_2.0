import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoAboutComponent } from './more-info-about.component';

describe('MoreInfoAboutComponent', () => {
  let component: MoreInfoAboutComponent;
  let fixture: ComponentFixture<MoreInfoAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreInfoAboutComponent]
    });
    fixture = TestBed.createComponent(MoreInfoAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

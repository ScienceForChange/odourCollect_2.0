import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEthicalIssuesComponent } from './about-ethical-issues.component';

describe('AboutEthicalIssuesComponent', () => {
  let component: AboutEthicalIssuesComponent;
  let fixture: ComponentFixture<AboutEthicalIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutEthicalIssuesComponent]
    });
    fixture = TestBed.createComponent(AboutEthicalIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

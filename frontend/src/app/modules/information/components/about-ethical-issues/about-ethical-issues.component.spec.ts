import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutEthicalIssuesComponent } from './about-ethical-issues.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutEthicalIssuesComponent', () => {
  let component: AboutEthicalIssuesComponent;
  let fixture: ComponentFixture<AboutEthicalIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
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

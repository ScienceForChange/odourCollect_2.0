import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDataProtectionComponent } from '../../../app/modules/information/components/about-data-protection/about-data-protection.component';
import { NgbActiveModal, NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutDataProtectionComponent', () => {
  let component: AboutDataProtectionComponent;
  let fixture: ComponentFixture<AboutDataProtectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
      declarations: [AboutDataProtectionComponent]
    });
    fixture = TestBed.createComponent(AboutDataProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

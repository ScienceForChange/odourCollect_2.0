import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutTrainedUserComponent } from '../../../app/modules/information/components/about-trained-user/about-trained-user.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutTrainedUserComponent', () => {
  let component: AboutTrainedUserComponent;
  let fixture: ComponentFixture<AboutTrainedUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
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

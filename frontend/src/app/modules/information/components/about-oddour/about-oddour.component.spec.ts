import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOddourComponent } from './about-oddour.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutOddourComponent', () => {
  let component: AboutOddourComponent;
  let fixture: ComponentFixture<AboutOddourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule],
      declarations: [AboutOddourComponent]
    });
    fixture = TestBed.createComponent(AboutOddourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

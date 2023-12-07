import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OdourCardComponent } from './odour-card.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('OdourCardComponent', () => {
  let component: OdourCardComponent;
  let fixture: ComponentFixture<OdourCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedComponentsModule],
      declarations: [OdourCardComponent]
    });
    //TODO @Tomas hay que hacer un dommy de observation
     // fixture = TestBed.createComponent(OdourCardComponent);
     // component = fixture.componentInstance;
     // fixture.detectChanges();
  });

  it('should create', () => {

     // expect(component).toBeTruthy();
  });
});

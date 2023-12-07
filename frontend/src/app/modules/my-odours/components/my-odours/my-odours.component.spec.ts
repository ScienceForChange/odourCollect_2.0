import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MyOdoursComponent } from './my-odours.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FiltersComponent } from '../filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('MyOdoursComponent', () => {
  let component: MyOdoursComponent;
  let fixture: ComponentFixture<MyOdoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [MyOdoursComponent, FiltersComponent]
    });
    fixture = TestBed.createComponent(MyOdoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

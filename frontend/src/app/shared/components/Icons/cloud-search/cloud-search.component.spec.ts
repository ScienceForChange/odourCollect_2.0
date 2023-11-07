import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSearchComponent } from './cloud-search.component';

describe('CloudSearchComponent', () => {
  let component: CloudSearchComponent;
  let fixture: ComponentFixture<CloudSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloudSearchComponent]
    });
    fixture = TestBed.createComponent(CloudSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

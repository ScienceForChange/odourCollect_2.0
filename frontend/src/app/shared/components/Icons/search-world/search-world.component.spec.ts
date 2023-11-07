import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorldComponent } from './search-world.component';

describe('SearchWorldComponent', () => {
  let component: SearchWorldComponent;
  let fixture: ComponentFixture<SearchWorldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWorldComponent]
    });
    fixture = TestBed.createComponent(SearchWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

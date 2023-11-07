import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadIconComponent } from './download-icon.component';

describe('DownloadIconComponent', () => {
  let component: DownloadIconComponent;
  let fixture: ComponentFixture<DownloadIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadIconComponent]
    });
    fixture = TestBed.createComponent(DownloadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

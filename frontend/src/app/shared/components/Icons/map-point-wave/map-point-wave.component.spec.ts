import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPointWaveComponent } from './map-point-wave.component';

describe('MapPointWaveComponent', () => {
  let component: MapPointWaveComponent;
  let fixture: ComponentFixture<MapPointWaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPointWaveComponent]
    });
    fixture = TestBed.createComponent(MapPointWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

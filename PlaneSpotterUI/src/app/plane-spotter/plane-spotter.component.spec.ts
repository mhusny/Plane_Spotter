import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneSpotterComponent } from './plane-spotter.component';

describe('PlaneSpotterComponent', () => {
  let component: PlaneSpotterComponent;
  let fixture: ComponentFixture<PlaneSpotterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneSpotterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneSpotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

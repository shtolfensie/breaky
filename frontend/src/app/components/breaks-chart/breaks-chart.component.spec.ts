import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreaksChartComponent } from './breaks-chart.component';

describe('BreaksChartComponent', () => {
  let component: BreaksChartComponent;
  let fixture: ComponentFixture<BreaksChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreaksChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreaksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

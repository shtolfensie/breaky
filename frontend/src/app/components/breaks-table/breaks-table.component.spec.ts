import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreaksTableComponent } from './breaks-table.component';

describe('BreaksTableComponent', () => {
  let component: BreaksTableComponent;
  let fixture: ComponentFixture<BreaksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreaksTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreaksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

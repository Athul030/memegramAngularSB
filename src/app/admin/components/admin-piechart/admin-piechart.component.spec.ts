import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPiechartComponent } from './admin-piechart.component';

describe('AdminPiechartComponent', () => {
  let component: AdminPiechartComponent;
  let fixture: ComponentFixture<AdminPiechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPiechartComponent]
    });
    fixture = TestBed.createComponent(AdminPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

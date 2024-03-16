import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGraphComponent } from './admin-graph.component';

describe('AdminGraphComponent', () => {
  let component: AdminGraphComponent;
  let fixture: ComponentFixture<AdminGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGraphComponent]
    });
    fixture = TestBed.createComponent(AdminGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

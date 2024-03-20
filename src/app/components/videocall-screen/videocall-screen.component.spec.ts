import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallScreenComponent } from './videocall-screen.component';

describe('VideocallScreenComponent', () => {
  let component: VideocallScreenComponent;
  let fixture: ComponentFixture<VideocallScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideocallScreenComponent]
    });
    fixture = TestBed.createComponent(VideocallScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

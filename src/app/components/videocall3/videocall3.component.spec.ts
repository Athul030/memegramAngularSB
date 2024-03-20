import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Videocall3Component } from './videocall3.component';

describe('Videocall3Component', () => {
  let component: Videocall3Component;
  let fixture: ComponentFixture<Videocall3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Videocall3Component]
    });
    fixture = TestBed.createComponent(Videocall3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

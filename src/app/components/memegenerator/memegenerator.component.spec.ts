import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemegeneratorComponent } from './memegenerator.component';

describe('MemegeneratorComponent', () => {
  let component: MemegeneratorComponent;
  let fixture: ComponentFixture<MemegeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemegeneratorComponent]
    });
    fixture = TestBed.createComponent(MemegeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

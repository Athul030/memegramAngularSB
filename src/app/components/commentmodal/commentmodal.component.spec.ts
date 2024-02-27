import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentmodalComponent } from './commentmodal.component';

describe('CommentmodalComponent', () => {
  let component: CommentmodalComponent;
  let fixture: ComponentFixture<CommentmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentmodalComponent]
    });
    fixture = TestBed.createComponent(CommentmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

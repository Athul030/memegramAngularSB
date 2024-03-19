import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCall2Component } from './video-call2.component';

describe('VideoCall2Component', () => {
  let component: VideoCall2Component;
  let fixture: ComponentFixture<VideoCall2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoCall2Component]
    });
    fixture = TestBed.createComponent(VideoCall2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

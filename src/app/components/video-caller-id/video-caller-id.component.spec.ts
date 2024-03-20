import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallerIdComponent } from './video-caller-id.component';

describe('VideoCallerIdComponent', () => {
  let component: VideoCallerIdComponent;
  let fixture: ComponentFixture<VideoCallerIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoCallerIdComponent]
    });
    fixture = TestBed.createComponent(VideoCallerIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRightSectionComponent } from './chat-right-section.component';

describe('ChatRightSectionComponent', () => {
  let component: ChatRightSectionComponent;
  let fixture: ComponentFixture<ChatRightSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatRightSectionComponent]
    });
    fixture = TestBed.createComponent(ChatRightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

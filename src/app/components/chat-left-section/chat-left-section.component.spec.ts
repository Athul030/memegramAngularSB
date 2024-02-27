import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLeftSectionComponent } from './chat-left-section.component';

describe('ChatLeftSectionComponent', () => {
  let component: ChatLeftSectionComponent;
  let fixture: ComponentFixture<ChatLeftSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatLeftSectionComponent]
    });
    fixture = TestBed.createComponent(ChatLeftSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

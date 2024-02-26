import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFollowersComponent } from './profile-followers.component';

describe('ProfileFollowersComponent', () => {
  let component: ProfileFollowersComponent;
  let fixture: ComponentFixture<ProfileFollowersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFollowersComponent]
    });
    fixture = TestBed.createComponent(ProfileFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

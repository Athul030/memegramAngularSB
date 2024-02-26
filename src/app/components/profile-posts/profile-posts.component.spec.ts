import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsComponent } from './profile-posts.component';

describe('ProfilePostsComponent', () => {
  let component: ProfilePostsComponent;
  let fixture: ComponentFixture<ProfilePostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePostsComponent]
    });
    fixture = TestBed.createComponent(ProfilePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlSegment } from '@angular/router';
import { AdminService } from 'src/app/admin/service/admin.service';
import { FollowRequestBody } from 'src/app/model/followDetails';
import { UserDTO } from 'src/app/model/user';
import { FollowService } from 'src/app/services/follow.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css']
})
export class RightSideBarComponent {

  userList: UserDTO[] = [];
  displayedSuggestions: UserDTO[] = [];

  suggestionsToShow = 3;
  currentIndex = 0;

  constructor(private service: AdminService, private storageSer: StorageService, private followSer: FollowService, private matSnack: MatSnackBar) { }
  currentUserId = this.storageSer.getUserId();

  ngOnInit(): void {
    this.fetchUsers();
  }

  getButtonText(user: UserDTO): string {
    return user.followers.some(follower => follower.id === this.currentUserId) ? 'Unfollow' : 'Follow';
  }

  loadMoreSuggestions() {
    const totalSuggestions = this.userList.length;

    if (totalSuggestions > 0) {
      const userListWithoutCurrentUser = this.userList.filter(user => user.id !== this.currentUserId);

      if (userListWithoutCurrentUser.length === 0) {
        // If no users to display, reset currentIndex to 0
        this.currentIndex = 0;
        return;
      }

      const endIndex = this.currentIndex + this.suggestionsToShow;
      const newSuggestions = userListWithoutCurrentUser.slice(this.currentIndex, endIndex);

      this.displayedSuggestions = [...newSuggestions].slice(0, this.suggestionsToShow);

      this.currentIndex += this.suggestionsToShow;
      console.log("part4: ", this.currentIndex);

      if (this.currentIndex >= totalSuggestions) {
        this.currentIndex = 0;
      }
    }
  }

  async fetchUsers() {
    this.service.getAllUsersForDashboard().subscribe(users => {
      this.userList = users.filter((user) => !user.followers.some(follow => follow.id === this.currentUserId));
      this.loadMoreSuggestions();
    });
  }

  async toggleFollow(user: UserDTO): Promise<void> {
    const isFollowing = user.followers.some(follower => follower.id === this.currentUserId);

    if (isFollowing) {
      await this.unfollow(user);
    } else {
      await this.follow(user);
      this.removeFromDisplayedSuggestions(user);
      this.fetchUsers();
    }
  }

  async follow(user: UserDTO): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const id = user.id;
      if (id === undefined) {
        console.log("Follower ID is undefined");
        return;
      }

      const userId = this.storageSer.getUserId();
      const followRequestBody: FollowRequestBody = {
        followerId: userId,
        followingId: id
      };

      this.followSer.follow(followRequestBody).subscribe(
        response => {
          if (response === true) {
            this.matSnack.open(
              'Followed Successfully', 'Ok', {
              duration: 3000,
              panelClass: 'custom-snack-bar-container'
            });
          }
        },
        error => {
          this.matSnack.open(
            'Follower not added due to error', 'Ok', {
            duration: 3000,
            panelClass: 'custom-snack-bar-container'
          });
          console.log("Following is unsuccessful", error);
        }
      );

      resolve();
    });
  }

  async unfollow(user: UserDTO): Promise<void> {
    const id = user.id;
    if (id === undefined) {
      console.log("Follower ID is undefined");
      return;
    }

    const userId = this.storageSer.getUserId();
    const followRequestBody: FollowRequestBody = {
      followerId: userId,
      followingId: id
    };

    this.followSer.unfollow(followRequestBody).subscribe(
      response => {
        if (response === true) {
          this.matSnack.open(
            'Unfollowed Successfully', 'Ok', {
            duration: 3000,
            panelClass: 'custom-snack-bar-container'
          });
        }
      },
      error => {
        this.matSnack.open(
          'Follower not removed due to error', 'Ok', {
          duration: 3000,
          panelClass: 'custom-snack-bar-container'
        });
        console.log("Unfollowing is unsuccessful", error);
      }
    );
  }

  removeFromDisplayedSuggestions(user: UserDTO): void {
    const index = this.displayedSuggestions.findIndex(suggestedUser => suggestedUser.id === user.id);
    if (index > -1) {
      this.displayedSuggestions.splice(index, 1);
    }
  }
}

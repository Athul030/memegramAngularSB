import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { UserDTO } from 'src/app/model/user';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css']
})
export class RightSideBarComponent {

  userList:UserDTO[]=[];
  displayedSuggestions: UserDTO[] = [];
  suggestionsToShow = 5;
  currentIndex = 0;


  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.fetchUsers();
  }

  loadMoreSuggestions() {
    const totalSuggestions = this.userList.length;

    if (totalSuggestions > 0) {
      const endIndex = this.currentIndex + this.suggestionsToShow;
      this.displayedSuggestions = this.userList.slice(this.currentIndex, endIndex);

      this.currentIndex += this.suggestionsToShow;

      if (this.currentIndex >= totalSuggestions) {
        this.currentIndex = 0;
      }
    }
  }
  fetchUsers(){
    this.service.getAllUsersForDashboard().subscribe(users => {
      this.userList = users;
      this.loadMoreSuggestions(); 
    });
  }
  


}




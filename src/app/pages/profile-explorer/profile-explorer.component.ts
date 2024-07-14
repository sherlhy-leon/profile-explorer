import { Component, OnInit } from '@angular/core';
import { UserSearchFormComponent } from '../../components/user-search-form/user-search-form.component';
import { UserProfileListComponent } from '../../components/user-profile-list/user-profile-list.component';
import { ProfileExplorerFacade } from './facade/profile-explorer.facade';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../../models/user-profile.model';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile-explorer',
  standalone: true,
  imports: [CommonModule, UserSearchFormComponent, UserProfileListComponent],
  templateUrl: './profile-explorer.component.html',
  styleUrl: './profile-explorer.component.scss'
})
export class ProfileExplorerComponent {

  usersProfile: UserProfile[] = []
  constructor(private readonly userProfileService: UserProfileService) {}

  search(searchValue: string): void {
    console.log("searching: ", searchValue)
    this.userProfileService.searchUsersByLogin(searchValue).pipe(tap((usersProfile: UserProfile[]) => (this.usersProfile = usersProfile))).subscribe();
  }

}

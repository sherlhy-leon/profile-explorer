import { Component, OnDestroy } from '@angular/core';
import { UserSearchFormComponent } from '../../components/user-search-form/user-search-form.component';
import { UserProfileListComponent } from '../../components/user-profile-list/user-profile-list.component';
import { ReplaySubject, BehaviorSubject, takeUntil } from 'rxjs';
import { UserProfile } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../services/user-profile.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile-explorer',
  standalone: true,
  imports: [
    CommonModule, 
    UserSearchFormComponent, 
    UserProfileListComponent,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile-explorer.component.html',
  styleUrl: './profile-explorer.component.scss'
})
export class ProfileExplorerComponent implements OnDestroy {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchValue: string;
  totalCount = 0;
  usersProfile: UserProfile[] = [];
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  constructor(private readonly userProfileService: UserProfileService, private router: Router) {}

  search(searchValue: string): void {
    this.searchValue = searchValue;
    this.getUsersProfile(searchValue);
  }

  nextPage(page: PageEvent) {
    this.getUsersProfile(this.searchValue, page.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getUsersProfile(searchValue: string, page: number = 1) {
    this.loading$.next(true);
    this.userProfileService.searchUsersByLogin(searchValue, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (response) => {
        this.usersProfile = response.items;
        this.totalCount = response.total_count;
        this.loading$.next(false);
      },
      error: (error) => {
        this.router.navigate(['/error']);
      }});
  }
}

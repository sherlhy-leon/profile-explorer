import { Component, OnInit } from '@angular/core';
import { UserSearchFormComponent } from '../../components/user-search-form/user-search-form.component';
import { UserProfileListComponent } from '../../components/user-profile-list/user-profile-list.component';
import { Observable, map, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileExplorerFacade } from './facade/profile-explorer.facade';
import { AppState } from '../../state/app-state';

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
export class ProfileExplorerComponent implements OnInit {

  state$: Observable<AppState>;

  constructor(private readonly profileExplorerFacade: ProfileExplorerFacade) {}

  ngOnInit(): void {
    this.state$ = combineLatest([
      this.profileExplorerFacade.searchTerm$,
      this.profileExplorerFacade.userResponse$.pipe(map(response => response?.items ?? [])),
      this.profileExplorerFacade.userResponse$.pipe(map(response => response?.total_count ?? 0)),
      this.profileExplorerFacade.loading$,
      this.profileExplorerFacade.pageIndex$,
    ]).pipe(
      map(([searchTerm, usersProfile, totalCount, loading, pageIndex]) => ({
        searchTerm,
        loading,
        totalCount,
        usersProfile,
        pageIndex
      }))
    );
  }

  search(searchValue: string): void {
    this.profileExplorerFacade.searchUsersByLogin(searchValue);
  }

  nextPage(page: PageEvent) {
    const searchValue = this.profileExplorerFacade.getSearchTerm();
    this.profileExplorerFacade.searchUsersByLogin(searchValue, page.pageIndex + 1);
  }
}

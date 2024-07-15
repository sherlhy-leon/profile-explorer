import { Component, OnInit } from '@angular/core';
import { UserSearchFormComponent } from '../../components/user-search-form/user-search-form.component';
import { UserProfileListComponent } from '../../components/user-profile-list/user-profile-list.component';
import { Observable, map } from 'rxjs';
import { UserProfile } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileExplorerFacade } from './facade/profile-explorer.facade';

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

  loading$:Observable<boolean>;
  searchValue$: Observable<string>;
  usersProfile$: Observable<UserProfile[]>;
  totalCount$: Observable<number>;
  pageIndex$: Observable<number>;

  constructor(private readonly profileExplorerFacade: ProfileExplorerFacade) {}

  ngOnInit(): void {
    this.searchValue$ = this.profileExplorerFacade.searchTerm$;
    this.usersProfile$ = this.profileExplorerFacade.userResponse$.pipe(map(response => response?.items ?? []));
    this.totalCount$ = this.profileExplorerFacade.userResponse$.pipe(map(response => response?.total_count ?? 0));
    this.loading$ = this.profileExplorerFacade.loading$;
    this.pageIndex$ = this.profileExplorerFacade.pageIndex$;
  }

  search(searchValue: string): void {
    this.profileExplorerFacade.searchUsersByLogin(searchValue);
  }

  nextPage(page: PageEvent) {
    const searchValue = this.profileExplorerFacade.getSearchTerm();
    this.profileExplorerFacade.searchUsersByLogin(searchValue, page.pageIndex + 1);
  }
}

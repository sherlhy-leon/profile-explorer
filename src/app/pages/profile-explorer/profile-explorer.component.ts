import { Component, OnInit } from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { ProfileListComponent } from '../../components/profile-list/profile-list.component';
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
    SearchFormComponent, 
    ProfileListComponent,
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
      this.profileExplorerFacade.searchValue$,
      this.profileExplorerFacade.userResponse$.pipe(map(response => response?.items ?? [])),
      this.profileExplorerFacade.userResponse$.pipe(map(response => response?.total_count ?? 0)),
      this.profileExplorerFacade.loading$,
      this.profileExplorerFacade.pageIndex$,
    ]).pipe(
      map(([searchValue, profiles, totalCount, loading, pageIndex]) => ({
        searchValue,
        loading,
        totalCount,
        profiles,
        pageIndex
      }))
    );
  }

  search(searchValue: string): void {
    this.profileExplorerFacade.searchProfilesByLogin(searchValue);
  }

  nextPage(page: PageEvent) {
    const searchValue = this.profileExplorerFacade.getSearchValue();
    this.profileExplorerFacade.searchProfilesByLogin(searchValue, page.pageIndex + 1);
  }
}

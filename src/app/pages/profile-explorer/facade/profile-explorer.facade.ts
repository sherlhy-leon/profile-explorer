import { Injectable } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../../../models/users-response.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProfileExplorerFacade {

    private _userResponse$ = new BehaviorSubject<UserResponse>(null);
    userResponse$ = this._userResponse$.asObservable();
    private _searchValue$ = new BehaviorSubject<string>("");
    searchValue$ = this._searchValue$.asObservable();
    private _pageIndex$ = new BehaviorSubject<number>(1);
    pageIndex$ = this._pageIndex$.asObservable();
    private _loading$ = new BehaviorSubject<boolean>(false);
    loading$ = this._loading$.asObservable();

    constructor(private readonly profileService: ProfileService, private router: Router) { }

    searchProfilesByLogin(searchValue: string, page = 1) {
        this._loading$.next(true);
        this.profileService.searchProfilesByLogin(searchValue, page).subscribe({
            next: response => {
                this._loading$.next(false);
                this._searchValue$.next(searchValue);
                this._pageIndex$.next(page);
                this._userResponse$.next(response);
            },
            error: _ => {
                this._loading$.next(false);
                this.router.navigate(['/error']);
            }
        });
    }

    getSearchValue() {
        return this._searchValue$.getValue();
    }
}
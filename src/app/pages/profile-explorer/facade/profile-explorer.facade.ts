import { Injectable } from '@angular/core';
import { UserProfileService } from '../../../services/user-profile.service';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../../../models/users-response.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProfileExplorerFacade {

    private _userResponse$ = new BehaviorSubject<UserResponse>(null);
    userResponse$ = this._userResponse$.asObservable();
    private _searchTerm$ = new BehaviorSubject<string>("");
    searchTerm$ = this._searchTerm$.asObservable();
    private _pageIndex$ = new BehaviorSubject<number>(1);
    pageIndex$ = this._pageIndex$.asObservable();
    private _loading$ = new BehaviorSubject<boolean>(false);
    loading$ = this._loading$.asObservable();

    constructor(private readonly userProfileService: UserProfileService, private router: Router) { }

    searchUsersByLogin(searchValue: string, page = 1) {
        this._loading$.next(true);
        this.userProfileService.searchUsersByLogin(searchValue, page).subscribe({
            next: response => {
                this._loading$.next(false);
                this._searchTerm$.next(searchValue);
                this._pageIndex$.next(page);
                this._userResponse$.next(response);
            },
            error: _ => {
                this._loading$.next(false);
                this.router.navigate(['/error']);
            }
        });
    }

    getSearchTerm() {
        return this._searchTerm$.getValue();
    }

}
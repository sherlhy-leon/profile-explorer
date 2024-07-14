import { Injectable } from '@angular/core';
import { UserProfileService } from '../../../services/user-profile.service';
import { UserProfile } from '../../../models/user-profile.model';
import { Observable, BehaviorSubject, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProfileExplorerFacade  {
    
    usersProfile: BehaviorSubject<UserProfile[]> = new BehaviorSubject<UserProfile[]>([])
    constructor(private readonly userProfileService: UserProfileService) {}

    searchUsersByLogin(searchValue: string): Observable<UserProfile[]> {
        return this.userProfileService.searchUsersByLogin(searchValue).pipe(tap((usersProfile: UserProfile[]) => (this.usersProfile.next(usersProfile))));
    }
   
}
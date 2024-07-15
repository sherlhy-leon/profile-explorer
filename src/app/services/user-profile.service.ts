import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { UserProfileDetails } from '../models/user-profile-details.model';
import { UserResponse } from '../models/users-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private readonly API_URL = 'https://api.github.com';

  constructor(private readonly http: HttpClient) {}

  searchUsersByLogin(value: string, page: number): Observable<UserProfile[]> {
    return this.http.get<UserResponse>(`${this.API_URL}/search/users?q=${value}&page=${page}&per_page=10`).pipe(map((resp: UserResponse) => resp.items));
  }

  getUserDetails(value: string): Observable<UserProfileDetails> {
    return this.http.get<UserProfileDetails>(`${this.API_URL}/users/${value}`);
  }
}

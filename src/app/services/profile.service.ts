import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDetails } from '../models/profile-details.model';
import { UserResponse } from '../models/users-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly API_URL = 'https://api.github.com';

  constructor(private readonly http: HttpClient) {}

  searchProfilesByLogin(value: string, page: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/search/users?q=${value}&page=${page}&per_page=10`);
  }

  getProfileDetails(value: string): Observable<ProfileDetails> {
    return this.http.get<ProfileDetails>(`${this.API_URL}/users/${value}`);
  }
}

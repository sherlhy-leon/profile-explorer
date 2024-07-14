import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserProfileService } from '../../services/user-profile.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfileDetails } from '../../models/user-profile-details.model';

@Component({
  selector: 'app-user-profile-details',
  standalone: true,
  imports: [ CommonModule, MatCardModule],
  templateUrl: './user-profile-details.component.html',
  styleUrl: './user-profile-details.component.scss'
})
export class UserProfileDetailsComponent implements OnInit {
  user: UserProfileDetails | null = null;

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('userlogin')!;
    this.userProfileService.getUserDetails(username).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

}

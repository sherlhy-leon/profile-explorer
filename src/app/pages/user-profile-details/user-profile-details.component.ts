import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserProfileService } from '../../services/user-profile.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserProfileDetails } from '../../models/user-profile-details.model';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../components/header/header.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule, HeaderComponent],
  templateUrl: './user-profile-details.component.html',
  styleUrl: './user-profile-details.component.scss'
})
export class UserProfileDetailsComponent implements OnInit {
  user: UserProfileDetails | null = null;

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService, private router: Router) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('userlogin')!;
    this.userProfileService.getUserDetails(username).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 404) {
          this.router.navigate(['/not-found']);
        }
        else {
          this.router.navigate(['/error']);
        }
      }
    })
  };

 
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileDetails } from '../../models/profile-details.model';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../components/header/header.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule, HeaderComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent implements OnInit {
  profile: ProfileDetails | null = null;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('userlogin')!;
    this.profileService.getProfileDetails(username).subscribe({
      next: (profile) => {
        this.profile = profile;
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

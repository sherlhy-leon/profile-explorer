import { Component, Input } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './user-profile-list.component.html',
  styleUrl: './user-profile-list.component.scss'
})
export class UserProfileListComponent {
  @Input() users: UserProfile[] = [];
}

import { Routes } from '@angular/router';
import { UserProfileDetailsComponent } from './components/user-profile-details/user-profile-details.component';
import { ProfileExplorerComponent } from './pages/profile-explorer/profile-explorer.component';

export const routes: Routes = [
    { path: '', component: ProfileExplorerComponent },
    { path: 'user/:userlogin', component: UserProfileDetailsComponent }
];

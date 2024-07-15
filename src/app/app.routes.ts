import { Routes } from '@angular/router';
import { UserProfileDetailsComponent } from './pages/user-profile-details/user-profile-details.component';
import { ProfileExplorerComponent } from './pages/profile-explorer/profile-explorer.component';
import { ErrorComponent } from './pages/error/error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: ProfileExplorerComponent },
    { path: 'user/:userlogin', component: UserProfileDetailsComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'not-found', component: NotFoundComponent }
];

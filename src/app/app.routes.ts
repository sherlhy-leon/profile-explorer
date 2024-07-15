import { Routes } from '@angular/router';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { ProfileExplorerComponent } from './pages/profile-explorer/profile-explorer.component';
import { ErrorComponent } from './pages/error/error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: ProfileExplorerComponent },
    { path: 'user/:userlogin', component: ProfileDetailsComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'not-found', component: NotFoundComponent }
];

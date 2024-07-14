import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileExplorerComponent } from './pages/profile-explorer/profile-explorer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileExplorerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'profile-explorer-app';
}

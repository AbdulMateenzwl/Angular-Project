import { Component } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  viewMode: 'grid' | 'list' = 'list';

  setView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
}

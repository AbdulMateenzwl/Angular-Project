import { Component } from '@angular/core';

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

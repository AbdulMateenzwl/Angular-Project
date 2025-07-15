import { Component, Output, EventEmitter } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() onOffMode = new EventEmitter<void>();

  constructor(protected darkModeService: DarkModeService) {}

  triggerOffMode() {
    this.onOffMode.emit();
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}

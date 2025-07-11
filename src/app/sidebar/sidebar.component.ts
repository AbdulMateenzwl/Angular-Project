import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() onOffMode = new EventEmitter<void>();

  triggerOffMode() {
    this.onOffMode.emit();
  }
}

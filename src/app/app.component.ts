import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-Project';

  isOffMode: boolean = false;

  toggleOffMode() {
    this.isOffMode = !this.isOffMode;
    if (this.isOffMode) {
      console.log('Off Mode Activated');
    } else {
      console.log('Off Mode Deactivated');
    }
  }

  closeOffMode = () => {
    this.isOffMode = false;
    console.log('Off Mode Closed');
  };
}

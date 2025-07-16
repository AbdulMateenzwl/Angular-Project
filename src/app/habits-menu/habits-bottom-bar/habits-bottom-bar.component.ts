import { Component } from '@angular/core';

@Component({
    selector: 'app-habits-bottom-bar',
    templateUrl: './habits-bottom-bar.component.html',
    styleUrls: ['./habits-bottom-bar.component.css'],
    standalone: false
})
export class HabitsBottomBarComponent {
  isCreatingHabit = false;

  toggleCreateHabit() {
    this.isCreatingHabit = !this.isCreatingHabit;
  }

  closeCreateHabit = () => {
    this.isCreatingHabit = false;
  };
}

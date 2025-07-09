import { Component, OnInit } from '@angular/core';
import { HabitsService } from './habits-menu/habits.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular-Project';

  isOffMode: boolean = false;

  constructor(private habitsService: HabitsService) {}

  ngOnInit(): void {
    this.habitsService.loadHabits();
  }

  toggleOffMode() {
    this.isOffMode = !this.isOffMode;
  }

  closeOffMode = () => {
    this.isOffMode = false;
  };
}

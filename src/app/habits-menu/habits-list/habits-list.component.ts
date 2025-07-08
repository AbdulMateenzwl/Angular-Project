import { Component, OnInit } from '@angular/core';
import { HabitsService } from '../habits.service';
import { Habit } from '../habit.model';

@Component({
  selector: 'app-habits-list',
  templateUrl: './habits-list.component.html',
  styleUrls: ['./habits-list.component.css'],
})
export class HabitsListComponent implements OnInit {
  habits: Habit[] = [];
  constructor(private habitsService: HabitsService) {}

  ngOnInit(): void {
    this.habitsService.habitsSubject.subscribe((habits: Habit[]) => {
      this.habits = habits;
    });
  }
}

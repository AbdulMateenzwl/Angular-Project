import { Component, OnInit } from '@angular/core';
import { HabitsService } from '../habits.service';
import { Habit } from '../habit.model';
import { HabitStatus } from 'src/app/enum/HabitStatus';

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

  get inCompletedHabits(): Habit[] {
    return this.habits.filter((habit) => habit.status === HabitStatus.PENDING );
  }

  get completedHabits(): Habit[] {
    return this.habits.filter((habit) => habit.status === HabitStatus.COMPLETED);
  }

  get skippedHabits(): Habit[] {
    return this.habits.filter((habit) => habit.status === HabitStatus.SKIPPED);
  }

  get failedHabits(): Habit[] {
    return this.habits.filter((habit) => habit.status === HabitStatus.FAILED);
  }
}

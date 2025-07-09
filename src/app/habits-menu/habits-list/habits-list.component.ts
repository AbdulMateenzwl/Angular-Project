import { Component, OnDestroy, OnInit } from '@angular/core';
import { HabitsService } from '../habits.service';
import { Habit } from '../habit.model';
import { HabitStatus } from 'src/app/enum/HabitStatus';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TimeOfDay } from 'src/app/enum/TimeOfDay';

@Component({
  selector: 'app-habits-list',
  templateUrl: './habits-list.component.html',
  styleUrls: ['./habits-list.component.css'],
})
export class HabitsListComponent implements OnInit, OnDestroy {
  habits: Habit[] = [];
  routerData: TimeOfDay = TimeOfDay.MORNING;
  habitsSubscription!: Subscription;

  constructor(
    private habitsService: HabitsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeData = this.route.snapshot.data['timeOfDay'] as TimeOfDay;
    this.routerData = routeData;

    this.habitsSubscription = this.habitsService.habitsSubject.subscribe(
      (habits: Habit[]) => {
        switch (this.routerData) {
          case TimeOfDay.MORNING:
          case TimeOfDay.AFTERNOON:
          case TimeOfDay.EVENING:
            this.habits = habits.filter(
              (habit) => habit.timeOfDay.includes(this.routerData)
            );
            break;
          default:
            this.habits = habits;
        }
      }
    );
  }

  get inCompletedHabits(): Habit[] {
    return this.habits.filter((habit) => habit.status === HabitStatus.PENDING);
  }

  get completedHabits(): Habit[] {
    return this.habits.filter(
      (habit) => habit.status === HabitStatus.COMPLETED
    );
  }

  get skippedHabits(): Habit[] {
    return this.habits.filter((habit) => habit.status === HabitStatus.SKIPPED);
  }

  get failedHabits(): Habit[] {
    return this.habits.filter((habit) => habit.status === HabitStatus.FAILED);
  }

  ngOnDestroy(): void {
    if (this.habitsSubscription) {
      this.habitsSubscription.unsubscribe();
    }
  }
}

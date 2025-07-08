import { BehaviorSubject } from 'rxjs';
import { Habit } from './habit.model';
import { FrequencyType } from '../enum/FrequencyType';
import { RepeatType } from '../enum/RepeatType';
import { Days } from '../enum/Days';
import { TimeOfDay } from '../enum/TimeOfDay';
import { Injectable } from '@angular/core';
import { HabitStatus } from '../enum/HabitStatus';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  habits: Habit[] = [
    new Habit('Exercise', new Date(), HabitStatus.PENDING, 30, FrequencyType.DAILY, 0, RepeatType.DAYS, TimeOfDay.MORNING, [Days.MONDAY, Days.WEDNESDAY, Days.FRIDAY], [], '08:00'),
    new Habit('Exercise', new Date(), HabitStatus.SKIPPED, 30, FrequencyType.DAILY, 0, RepeatType.DAYS, TimeOfDay.MORNING, [Days.MONDAY, Days.WEDNESDAY, Days.FRIDAY], [], '08:00'),
    new Habit('Exercise', new Date(), HabitStatus.FAILED, 30, FrequencyType.DAILY, 0, RepeatType.DAYS, TimeOfDay.MORNING, [Days.MONDAY, Days.WEDNESDAY, Days.FRIDAY], [], '08:00'),
    new Habit('Exercise', new Date(), HabitStatus.COMPLETED, 30, FrequencyType.DAILY, 30, RepeatType.DAYS, TimeOfDay.MORNING, [Days.MONDAY, Days.WEDNESDAY, Days.FRIDAY], [], '08:00'),
  ];
  habitsSubject = new BehaviorSubject<Habit[]>(this.habits);

  addHabit(habit: Habit) {
    this.habits.push(habit);
    this.habitsSubject.next(this.habits);
  }

  addProgress(habitId: string, progress: number) {
    const habitToUpdate = this.habits.find(h => h.id === habitId);
    if (habitToUpdate) {
      habitToUpdate.progress += progress;
      habitToUpdate.status = habitToUpdate.progress >= habitToUpdate.frequency ? HabitStatus.COMPLETED : HabitStatus.PENDING;
      this.habitsSubject.next(this.habits);
    }
  }
}

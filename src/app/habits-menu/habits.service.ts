import { BehaviorSubject } from 'rxjs';
import { Habit } from './habit.model';
import { FrequencyType } from '../enum/FrequencyType';
import { RepeatType } from '../enum/RepeatType';
import { Days } from '../enum/Days';
import { TimeOfDay } from '../enum/TimeOfDay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  habits: Habit[] = [
    new Habit('Exercise', new Date(), 6, FrequencyType.Daily, RepeatType.Days, [Days.Monday, Days.Wednesday, Days.Friday], [], '08:00', TimeOfDay.Morning, 0),
    new Habit('Drink Water', new Date(), 6, FrequencyType.Daily, RepeatType.Days, [Days.Monday, Days.Wednesday, Days.Friday], [], '08:00', TimeOfDay.Morning, 0),
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
      this.habitsSubject.next(this.habits);
      console.log(`Progress added to habit ${habitId}: ${progress}. New progress: ${habitToUpdate.progress}`);
    }
  }
}

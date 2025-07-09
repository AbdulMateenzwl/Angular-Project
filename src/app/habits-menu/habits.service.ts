import { BehaviorSubject } from 'rxjs';
import { Habit } from './habit.model';
import { Injectable } from '@angular/core';
import { HabitStatus } from '../enum/HabitStatus';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  habits: Habit[] = [];
  habitsSubject = new BehaviorSubject<Habit[]>(this.habits);

  constructor(private http: HttpClient) {}

  addHabit(habit: Habit) {
    this.habits.push(habit);
    this.storeHabit(habit);
    this.habitsSubject.next(this.habits);
  }

  addProgress(habitId: string, progress: number) {
    const habitToUpdate = this.habits.find((h) => h.id === habitId);
    if (habitToUpdate) {
      habitToUpdate.progress += progress;
      habitToUpdate.status =
        habitToUpdate.progress >= habitToUpdate.frequency
          ? HabitStatus.COMPLETED
          : HabitStatus.PENDING;
      this.habitsSubject.next(this.habits);
    }
  }

  clearLogs(habitId: string) {
    const habitToUpdate = this.habits.find((h) => h.id === habitId);
    if (habitToUpdate) {
      habitToUpdate.progress = 0;
      habitToUpdate.status = HabitStatus.PENDING;
      this.habitsSubject.next(this.habits);
    }
  }

  completeHabit(id: string) {
    const habitToUpdate = this.habits.find((h) => h.id === id);
    if (habitToUpdate) {
      habitToUpdate.status = HabitStatus.COMPLETED;
      habitToUpdate.progress = habitToUpdate.frequency;
      this.habitsSubject.next(this.habits);
    }
  }

  updateHabitStatus(id: string, status: HabitStatus) {
    const habitToUpdate = this.habits.find((h) => h.id === id);
    if (habitToUpdate) {
      habitToUpdate.status = status;
      this.updateHabit(habitToUpdate);
      this.habitsSubject.next(this.habits);
    }
  }

  deleteHabit(id: string) {
    this.habits = this.habits.filter((habit) => habit.id !== id);

    this.http
      .delete(
        `https://habitify-demo-task-default-rtdb.firebaseio.com/habits/${id}.json`
      )
      .subscribe(
        () => {
          this.loadHabits();
        },
        (error) => console.error('Delete failed:', error)
      );

    this.habitsSubject.next(this.habits);
  }

  getHabitById(id: string): Habit | undefined {
    return this.habits.find((habit) => habit.id === id);
  }

  editHabit(id: string, habit: Habit) {
    const index = this.habits.findIndex((h) => h.id === id);
    if (index !== -1) {
      this.habits[index] = habit;
      this.updateHabit(habit);
      this.habitsSubject.next(this.habits);
    }
  }

  loadHabits() {
    this.http
      .get<{ [key: string]: Habit }>(
        'https://habitify-demo-task-default-rtdb.firebaseio.com/habits.json'
      )
      .subscribe(
        (habits) => {
          let loadedHabits: Habit[] = [];
          for (const key in habits) {
            const habit = habits[key];
            habit.id = key;
            loadedHabits.push(habit);
          }
          this.habits = loadedHabits;
          this.habitsSubject.next(this.habits);
          console.log('Habits loaded:', this.habits);
        },
        (error) => {
          console.error('Error loading habits:', error);
        }
      );
  }

  private storeHabit(habit: Habit) {
    this.http
      .post<Habit>(
        'https://habitify-demo-task-default-rtdb.firebaseio.com/habits.json',
        habit
      )
      .subscribe(() => {
        this.loadHabits();
      });
  }

  private updateHabit(habit: Habit) {
    if (!habit.id) return;

    this.http
      .patch(
        `https://habitify-demo-task-default-rtdb.firebaseio.com/habits/${habit.id}.json`,
        habit
      )
      .subscribe(
        () => {
          this.loadHabits();
        },
        (error) => console.error('Update failed:', error)
      );
  }
}

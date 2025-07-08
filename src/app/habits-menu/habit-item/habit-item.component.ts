import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitsService } from '../habits.service';
import { HabitStatus } from '../../enum/HabitStatus';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-habit-item',
  templateUrl: './habit-item.component.html',
  styleUrls: ['./habit-item.component.css'],
})
export class HabitItemComponent implements OnInit {
  @Input() habit!: Habit;
  items: MenuItem[] | undefined;

  constructor(private habitsService: HabitsService) {}

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Mark as Completed',
            command: () => {
              if (this.habit) {
                this.habitsService.completeHabit(this.habit.id);
              }
            },
          },
          {
            label: 'Mark as Failed',
            command: () => {
              if (this.habit) {
                this.habitsService.updateHabitStatus(
                  this.habit.id,
                  HabitStatus.FAILED
                );
              }
            },
          },
          {
            label: 'Mark as Skipped',
            command: () => {
              if (this.habit) {
                this.habitsService.updateHabitStatus(
                  this.habit.id,
                  HabitStatus.SKIPPED
                );
              }
            },
          },
        ],
      },
    ];
  }

  onAddProgress(progress: string) {
    const progressNumber = parseInt(progress, 10);
    if (isNaN(progressNumber) || progressNumber <= 0) {
      return;
    }
    if (this.habit) {
      this.habitsService.addProgress(this.habit.id, progressNumber);
    }
  }

  onLogClear() {
    this.habitsService.clearLogs(this.habit.id);
  }

  get HabitStatus() {
    return HabitStatus;
  }
}

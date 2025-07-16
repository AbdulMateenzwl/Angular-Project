import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitsService } from '../habits.service';
import { HabitStatus } from '../../enum/HabitStatus';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-habit-item',
    templateUrl: './habit-item.component.html',
    styleUrls: ['./habit-item.component.css'],
    standalone: false
})
export class HabitItemComponent implements OnInit {
  @Input() habit!: Habit;
  items: MenuItem[] = [
    {
      items: [
        {
          icon:'pi pi-check-circle',
          label: 'Mark as Completed',
          command: () => {
            if (this.habit) {
              this.habitsService.completeHabit(this.habit.id);
            }
          },
        },
        {
          icon: 'pi pi-times-circle',
          label: 'Mark as Failed',
          command: () => {
            this.habitsService.updateHabitStatus(
              this.habit.id,
              HabitStatus.FAILED
            );
          },
        },
        {
          icon: 'pi pi-minus-circle',
          label: 'Mark as Skipped',
          command: () => {
            this.habitsService.updateHabitStatus(
              this.habit.id,
              HabitStatus.SKIPPED
            );
          },
        },
        {
          icon: 'pi pi-pencil',
          label: 'Edit',
          command: () => {
            this.toggleEditHabit();
          },
        },
        {
          icon :'pi pi-trash',
          label: 'Delete',
          command: () => {
            this.habitsService.deleteHabit(this.habit.id);
          },
        },
      ],
    },
  ];

  isEditingHabit = false;

  constructor(private habitsService: HabitsService) {}

  ngOnInit() {}

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

  toggleEditHabit() {
    this.isEditingHabit = !this.isEditingHabit;
  }

  closeEditHabit = () => {
    this.isEditingHabit = false;
  };
}

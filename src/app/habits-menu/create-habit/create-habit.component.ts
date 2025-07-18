import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FrequencyType } from 'src/app/enum/FrequencyType';
import { RepeatType } from 'src/app/enum/RepeatType';
import { TimeOfDay } from 'src/app/enum/TimeOfDay';
import { HabitsService } from '../habits.service';
import { Habit } from '../habit.model';
import { HabitStatus } from 'src/app/enum/HabitStatus';
import { Days } from 'src/app/enum/Days';

@Component({
    selector: 'app-create-habit',
    templateUrl: './create-habit.component.html',
    styleUrls: ['./create-habit.component.css'],
    standalone: false
})
export class CreateHabitComponent implements OnInit {
  @Input() onClose!: () => void;
  @Input() habitId = '';

  newHabitForm!: FormGroup;

  goalTimesOptions: string[] = ['Times', 'Units'];

  goalFrequencyOptions: string[] = Object.values(FrequencyType);
  repeatOptions: string[] = Object.values(RepeatType);

  timeOfDayOptions = Object.values(TimeOfDay);

  isEditMode = false;

  @ViewChild('backdrop') backdropRef!: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder, private habitService: HabitsService) {}

  ngOnInit(): void {
    if (this.habitId) {
      const habit = this.habitService.getHabitById(this.habitId);
      if (habit) {
        this.isEditMode = true;
        this.newHabitForm = this.fb.group({
          name: [habit.title, Validators.required],
          goal: this.fb.group({
            value: [habit.frequency, [Validators.required, Validators.min(1)]],
            times: [habit.frequenceyType, Validators.required],
            frequency: [habit.frequenceyType, Validators.required],
          }),
          repeat: [habit.repeatType, Validators.required],
          timeOfDay: [habit.timeOfDay, Validators.required],
          startDate: [new Date(habit.startDate), Validators.required],
          reminders: [habit.reminderTime],
        });
      }
    } else {
      this.newHabitForm = this.fb.group({
        name: ['', Validators.required],
        goal: this.fb.group({
          value: [1, [Validators.required, Validators.min(1)]],
          times: [this.goalTimesOptions[0], Validators.required],
          frequency: [this.goalFrequencyOptions[0], Validators.required],
        }),
        repeat: [this.repeatOptions[0], Validators.required],
        timeOfDay: [this.timeOfDayOptions[0], Validators.required],
        startDate: [new Date(), Validators.required],
        reminders: [''],
      });
    }
  }

  onSubmit(): void {
    if (this.newHabitForm.valid) {
      if (this.isEditMode) {
        const habitData = this.newHabitForm.value;
        const oldHabit = this.habitService.getHabitById(this.habitId);
        if(!oldHabit) {
          return;
        }
        const updatedHabit = new Habit(
          habitData.name,
          habitData.startDate,
          HabitStatus.PENDING,
          habitData.goal.value,
          habitData.goal.frequency,
          oldHabit?.progress,
          habitData.repeat,
          habitData.timeOfDay,
          [],
          [],
          ''
        );
        updatedHabit.id = this.habitId;
        this.habitService.editHabit(this.habitId, updatedHabit);
      } else {
        const habitData = this.newHabitForm.value;
        const habit = new Habit(
          habitData.name,
          habitData.startDate,
          HabitStatus.PENDING,
          habitData.goal.value,
          habitData.goal.frequency,
          0,
          habitData.repeat,
          habitData.timeOfDay,
          [],
          [],
          ''
        );
        this.habitService.addHabit(habit);
      }

      this.onClose();
    } else {
      this.newHabitForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    if (this.newHabitForm.dirty) {
      const confirmCancel = confirm(
        'You have unsaved changes. Are you sure you want to cancel?'
      );
      if (!confirmCancel) {
        return;
      }
    }
    this.onClose();
  }

  handleBackdropClick(event: MouseEvent) {
    if (event.target === this.backdropRef.nativeElement) {
      this.onClose?.();
    }
  }
}

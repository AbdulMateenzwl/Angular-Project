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
})
export class CreateHabitComponent implements OnInit {
  @Input() onClose!: () => void;

  newHabitForm!: FormGroup;

  goalTimesOptions: string[] = ['Times', 'Units'];

  goalFrequencyOptions: string[] = Object.values(FrequencyType);
  repeatOptions: string[] = Object.values(RepeatType);

  timeOfDayOptions = Object.values(TimeOfDay);

  @ViewChild('backdrop') backdropRef!: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder, private habitService: HabitsService) {}

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.newHabitForm.valid) {
      console.log('Form Submitted!', this.newHabitForm.value);
      const habitData = this.newHabitForm.value;
      const habit = new Habit(
        habitData.name,
        habitData.startDate,
        HabitStatus.PENDING,
        habitData.goal.value,
        FrequencyType[habitData.goal.frequency as keyof typeof FrequencyType],
        habitData.goal.value,
        RepeatType[habitData.repeat as keyof typeof RepeatType],
        [TimeOfDay[habitData.timeOfDay as keyof typeof TimeOfDay]],
        [],
        [],
        ''
      );

      this.habitService.addHabit(habit);
      this.onClose();
    } else {
      this.newHabitForm.markAllAsTouched();
      alert('Please fill out all required fields correctly.');
    }
  }

  onCancel(): void {
    // Reset the form to its initial state
    this.newHabitForm.reset({
      name: '',
      goal: {
        value: 1,
        times: 'Times',
        frequency: 'Per Day',
      },
      repeat: 'Daily',
      timeOfDay: 'Any Time',
      startDate: new Date(),
      reminders: '',
    });
    console.log('Form Cancelled and Reset.');
    alert('Form has been cancelled and reset.'); // Using alert for demonstration
  }

  handleBackdropClick(event: MouseEvent) {
    if (event.target === this.backdropRef.nativeElement) {
      this.onClose?.();
    }
  }
}

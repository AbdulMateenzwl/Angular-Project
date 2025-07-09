import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FrequencyType } from 'src/app/enum/FrequencyType';
import { RepeatType } from 'src/app/enum/RepeatType';
import { TimeOfDay } from 'src/app/enum/TimeOfDay';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newHabitForm = this.fb.group({
      name: ['', Validators.required],
      goal: this.fb.group({
        value: [1, [Validators.required, Validators.min(1)]],
        times: ['Times', Validators.required],
        frequency: ['Per Day', Validators.required],
      }),
      repeat: [null, Validators.required],
      timeOfDay: ['Any Time', Validators.required],
      startDate: [new Date(), Validators.required],
      reminders: [''], 
    });
  }

  onSubmit(): void {
    if (this.newHabitForm.valid) {
      // Log the form value if it's valid
      console.log('Form Submitted!', this.newHabitForm.value);
      // Here you would typically send the data to a service or API
      // For example: this.habitService.saveHabit(this.newHabitForm.value);
      alert('Habit saved successfully! Check console for details.'); // Using alert for demonstration
    } else {
      // Mark all fields as touched to display validation errors
      this.newHabitForm.markAllAsTouched();
      console.log('Form is invalid. Please check the fields.');
      alert('Please fill out all required fields correctly.'); // Using alert for demonstration
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

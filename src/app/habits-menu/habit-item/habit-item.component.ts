import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitsService } from '../habits.service';

@Component({
  selector: 'app-habit-item',
  templateUrl: './habit-item.component.html',
  styleUrls: ['./habit-item.component.css']
})
export class HabitItemComponent implements OnInit {

  @Input() habit!: Habit;

  @ViewChild('input') inputElement!: HTMLInputElement;

  constructor(private habitsService: HabitsService) { }

  ngOnInit(): void {
  }

  addProgress(progress:string) {
    const progressNumber = parseInt(progress, 10);
    if (isNaN(progressNumber) || progressNumber <= 0) {
      return;
    }
    if (this.habit) {
      this.habitsService.addProgress(this.habit.id,  progressNumber);
    }
  }

}

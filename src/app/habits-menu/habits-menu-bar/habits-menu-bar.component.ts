import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-habits-menu-bar',
  templateUrl: './habits-menu-bar.component.html',
  styleUrls: ['./habits-menu-bar.component.css'],
})
export class HabitsMenuBarComponent {
  date: Date = new Date();
  maxDate: Date = new Date();

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Reminder Time',
          },
          {
            label: 'My Habists Order',
          },
        ],
      },
    ];
  }
}

import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OffModeService } from '../off-mode/off-mode.service';

@Component({
  selector: 'app-habits-menu',
  templateUrl: './habits-menu.component.html',
  styleUrls: ['./habits-menu.component.css'],
})
export class HabitsMenuComponent {

  constructor(protected offModeService: OffModeService) {}
}

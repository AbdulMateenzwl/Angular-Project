import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitsMenuComponent } from './habits-menu/habits-menu.component';
import { TimeOfDay } from './enum/TimeOfDay';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'journal/all-habits',
    pathMatch: 'full',
  },
  {
    path: 'journal',
    children: [
      {
        path: 'all-habits',
        component: HabitsMenuComponent,
        data: { timeOfDay: 'all' },
      },
      {
        path: 'morning',
        component: HabitsMenuComponent,
        data: { timeOfDay: TimeOfDay.MORNING },
      },
      {
        path: 'afternoon',
        component: HabitsMenuComponent,
        data: { timeOfDay: TimeOfDay.AFTERNOON },
      },
      {
        path: 'evening',
        component: HabitsMenuComponent,
        data: { timeOfDay: TimeOfDay.EVENING },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

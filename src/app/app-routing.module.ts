import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitsMenuComponent } from './habits-menu/habits-menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'journal/all-habits',
    pathMatch: 'full',
  },
  {
    path: 'journal',
    children: [
      { path: 'all-habits', component: HabitsMenuComponent },
      {
        path: 'morning',
        component: HabitsMenuComponent,
      },
      {
        path:'afternoon',
        component: HabitsMenuComponent,
      },
      {
        path: 'evening',
        component: HabitsMenuComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

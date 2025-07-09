import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HabitsMenuComponent } from './habits-menu/habits-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { HabitsMenuBarComponent } from './habits-menu/habits-menu-bar/habits-menu-bar.component';
import { HabitItemComponent } from './habits-menu/habit-item/habit-item.component';
import { HabitsListComponent } from './habits-menu/habits-list/habits-list.component';
import { HabitsBottomBarComponent } from './habits-menu/habits-bottom-bar/habits-bottom-bar.component';
import { CreateHabitComponent } from './habits-menu/create-habit/create-habit.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    HabitsMenuComponent,
    HabitsMenuBarComponent,
    HabitItemComponent,
    HabitsListComponent,
    HabitsBottomBarComponent,
    CreateHabitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    MenuModule,
    ReactiveFormsModule,
    MultiSelectModule,
    AutoCompleteModule,
    DropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

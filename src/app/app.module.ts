import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HabitsMenuComponent } from './habits-menu/habits-menu.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { HabitsMenuBarComponent } from './habits-menu/habits-menu-bar/habits-menu-bar.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, TopbarComponent, HabitsMenuComponent, HabitsMenuBarComponent],
  imports: [BrowserModule, AppRoutingModule, CalendarModule, FormsModule, BrowserAnimationsModule, MenuModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

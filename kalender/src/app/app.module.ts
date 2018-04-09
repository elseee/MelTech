import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";

import { AppComponent } from './app.component';
import { MyComponent } from './my/my-component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

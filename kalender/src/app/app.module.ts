import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { HttpClientModule }    from '@angular/common/http';


import {AfsprakenService} from "./afspraken.service";
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
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AfsprakenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

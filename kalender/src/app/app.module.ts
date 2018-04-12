import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { HttpClientModule }    from '@angular/common/http';


import {AfsprakenService} from "./afspraken.service";
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { AppComponent } from './app.component';
import { MyComponent } from './my/my-component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MyComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AfsprakenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

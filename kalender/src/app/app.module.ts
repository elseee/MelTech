import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';




import {AfsprakenService} from "./afspraken.service";
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { AppComponent } from './app.component';
import { MyComponent } from './my/my-component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { KlantComponent } from './klant/klant.component';
import { MapsComponent } from './maps/maps.component';
import { SuccesComponent } from './succes/succes.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OverOnsComponent } from './over-ons/over-ons.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MyComponent,
    LoginComponent,
    KlantComponent,
    MapsComponent,
    SuccesComponent,
    HomepageComponent,
    OverOnsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MyDatePickerModule
  ],
  providers: [
    AfsprakenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {GridModule} from "@progress/kendo-angular-grid";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ReservedComponent } from './reserved/reserved.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { IntlModule } from "@progress/kendo-angular-intl";

import {
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
} from '@angular/material';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ReservedComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    GridModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    DateInputsModule,
    InputsModule,
    ButtonsModule,
    // LabelModule,
    // IntlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

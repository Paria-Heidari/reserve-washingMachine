import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservedComponent } from './reserved/reserved.component';
import { BookingListComponent} from './booking-list/booking-list.component';



const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
  },
  {
    path: 'reserve',
    component:ReservedComponent,
  },
  {
    path: 'booking-list',
    component:BookingListComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

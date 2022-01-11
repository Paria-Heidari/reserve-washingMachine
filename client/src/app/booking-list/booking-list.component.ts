import { Component, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import {Reserved} from '../shared/reserved';
import {ReservedService} from '../services/reserved.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common'
import { GridModule } from '@progress/kendo-angular-grid';
import { Observable } from "rxjs";
import { PageSizeItem } from '@progress/kendo-angular-grid';
// import { State } from "@progress/kendo-data-query";
// import { Day } from "@progress/kendo-date-math";
// // import * as moment from 'moment';
// import {
//     FormGroup,
//     FormControl,
//     Validators,
//     FormBuilder,
// } from "@angular/forms";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  public loading = true;
  public errMsg : string;
  public successMsg: string;
  public allReserved: Reserved[] = [];
  pipe = new DatePipe('en-US');

  public columns = ['reservedDate', 'Time', 'machineType', 'name', 'email','phoneNumber', 'cancel'];

  constructor(
    private reservedService:ReservedService,
    // public datepipe: DatePipe
    ) { }

  ngOnInit() {

    // Get Reserved
    this.reservedService.getReserved().subscribe(res =>{
      this.allReserved = res;
      this.loading= false;
      for (let i in this.allReserved){
        this.allReserved[i].reservedDate = this.pipe.transform(this.allReserved[i].reservedDate, 'dd-MM-yyyy')
      }
    },
    (err:ErrorEvent)=>{
      this.errMsg = err.error.message;
      this.loading = false;
    });
  }
  // Cancell the reserved and Get the updated reserved list
  cancelReserved(id:string){
    this.reservedService.cancelReserved(id)
    .pipe(
      mergeMap(() => this.reservedService.getReserved())
    )
    .subscribe((appointments: Reserved[]) => {
      this.allReserved = appointments;
    },
    (err: ErrorEvent) => {
      this.errMsg = err.error.message;
    });
  }
  //Confirming before cancelling
  Confirm_removeHandler(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelReserved(id);
        Swal.fire(
          'Cancelled!',
          'Your reservation has been Cancelled.',
          'success'
        )
      }
    })
  }

}

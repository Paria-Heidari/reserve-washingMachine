import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReservedService} from '../services/reserved.service';
import { SlideToggleModule } from 'ngx-slide-toggle';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {

  public errMsg : string;
  formGroup: FormGroup;
  waitingRegister:boolean = true;
  machines;
  machinesProgs;
  allMachines = [];
  post: any = '';
  mATime;
  mBTime;
  mCTime;
  mATimeFutureTime=[];
  mBTimeFutureTime=[];
  mCTimeFutureTime=[];
  type;

  public reservedDate: string;
  public machineType: string;
  public machineTime: string;
  public name: string;
  public email: string;
  public phoneNumber: string;
  static currentUserId= '';
  availableButton;
  waitingList: Boolean = false;

  constructor(private reservedService: ReservedService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    //Static variable that is declered nside the Auth component
    AuthComponent.authUserId;
    // can check if user is not login, not allowed to rese
    if(AuthComponent.authUserId == ''){
      this.availableButton = false;
    }

    this.loadData();
    this.createForm();

  }

  loadData(){
      this.reservedService.getMachine().subscribe(res =>{
        this.machines = res;
        for (let i in this.machines){
          for (let p in this.machines[i]['washingPrograms']){
            this.allMachines.push(this.machines[i]['washingPrograms'][p].name + '/'+ this.machines[i]['machineId']);
            if(this.machines[i]['washingPrograms'][p].name == "Håndvask"){
              this.mATime = this.machines[i]['washingPrograms'][p].time;
            }else if(this.machines[i]['washingPrograms'][p].name == "Tøyvask"){
              this.mBTime = this.machines[i]['washingPrograms'][p].time;
            }else{
              this.mCTime = this.machines[i]['washingPrograms'][p].time;
            }
          }
        let run_once = 0;
        if (run_once == 0){
          // from 9:00 to 17:00 "Håndvask"
          // 17 times
          for(let i=0; i<= 500; i = i+this.mATime+10){
            this.mATimeFutureTime.push(moment().hours(9).minutes(0).seconds(0).add(i,'minute').format("HH:mm"));
          };
          // from 9:00 to 17:10 "Tøyvask"
          // 8 times
          for(let i=0; i<= 500; i = i+this.mBTime+10){
            this.mBTimeFutureTime.push(moment().hours(9).minutes(0).seconds(0).add(i,'minute').format("HH:mm"));
          };
          // from 9:00 to 17:20 "Kokvask"
          // 6 times
          for(let i=0; i<= 500; i = i+this.mCTime+10){
            this.mCTimeFutureTime.push(moment().hours(9).minutes(0).seconds(0).add(i,'minute').format("HH:mm"));
          };
          run_once = 1;
        }
      }
      });
  }

  handleMachineTimeChange(machineT: string, event: any) {
    if (event.isUserInput) {    // ignore on deselection of the previous option
      this.type = machineT.substring(0, 3);
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'reservedDate': ['', Validators.required],
      'machineType': ['', Validators.required],
      'machineTime': ['', Validators.required],
      'name': ["", Validators.required],
      'email': ["", Validators.required],
      'phoneNumber': ["", Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(12), Validators.pattern(/^(0047|\+47|47)?([0-9]\d*)?$/)])],

    });
  }

  onSubmit(formGroup) {
    this.post = formGroup;
    console.log(formGroup);
    if(this.waitingList){
      this.addedInWaitingList(formGroup);
    }else{
      this.createReservation(formGroup);
    }
  }

  createReservation(formGroup){
    this.errMsg = '';
    this.reservedDate = formGroup.reservedDate;
    this.machineType = formGroup.machineType;
    this.machineTime = formGroup.machineTime;

    formGroup.reservedDate = moment.utc(formGroup.reservedDate).local().format('YYYY-MM-DD');
    this.reservedService.createReservation(formGroup)
    .subscribe(res =>{
      ReservedComponent.currentUserId = AuthComponent.authUserId;
      // const reservedDate = new Date (res.reservedDate).toISOString();
      this.successedbox(this.reservedDate, this.machineType, this.machineTime);
    },
    (err:ErrorEvent)=>{
      this.errMsg = err.error.message;
    });
  }

  successedbox(reservedDate, machineType, machineTime){
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Check your enterance/ QR code in your Email',
    text: `Your reservation is booked for ${machineType} on ${reservedDate} at ${machineTime}`,
    showConfirmButton: false,
    timer: 7000
  })
  }

  addedInWaitingList(formGroup){
    this.errMsg = '';
    this.reservedDate = formGroup.reservedDate;
    this.machineType = formGroup.machineType;
    this.machineTime = formGroup.machineTime;

    formGroup.reservedDate = moment.utc(formGroup.reservedDate).local().format('YYYY-MM-DD');
    this.reservedService.addedInWaitingList(formGroup)
    .subscribe(res =>{
      // const reservedDate = new Date (res.reservedDate).toISOString();
      this.successedBoxWaiting(this.reservedDate, this.machineType);
    },
    (err:ErrorEvent)=>{
      this.errMsg = err.error.message;
    });
  }
  successedBoxWaiting(reservedDate, machineType){
    Swal.fire({
    // position: 'top-end',
    icon: 'success',
    title: 'Waiting List',
    text: `Your are registered in the waiting list for ${machineType} on ${reservedDate}`,
    showConfirmButton: false,
    timer: 2000
  })
  }

}

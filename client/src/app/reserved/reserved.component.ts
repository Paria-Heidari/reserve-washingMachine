import { Component, OnInit } from '@angular/core';
import {ReservedService} from '../services/reserved.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {

  public errMsg : string;
  public successMsg: string;
  formGroup: FormGroup;
  waitingRegister:boolean = true;
  machines;
  allMachines = [];

  post: any = '';
  public min: Date = new Date(2000, 2, 10, 2, 30);
  public max: Date = new Date(2002, 2, 10, 22, 15);
  public value: Date = new Date(2000, 2, 10, 10, 0);

  public reservedDate: string;
  public name: string;
  public emai: string;
  constructor(private reservedService: ReservedService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.reservedService.getMachine().subscribe(res =>{
      this.machines = res;
      for (let i in this.machines){
        // this.machineType = i.name;
        // this.machineCode = i.code;
        this.allMachines.push(this.machines[i].name + '/'+ this.machines[i].code);
        console.log(this.allMachines);
      }
    })
    this.createForm();
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
    console.log(formGroup);
    this.post = formGroup;
  }

  createReservation(formGroup){
    console.log(formGroup);
    this.errMsg = '';
    this.successMsg = '';
    // project.shipmentDate = moment.utc(dataItem.shipmentDate).local().format('YYYY-MM-DD');
    this.reservedService.createReservation(this.reservedDate, this.name, this.emai)
    .subscribe(res =>{
      this.reservedDate = '';
      this.name= '';
      this.emai= '';
      // const reservedDate = new Date (res.reservedDate).toISOString();
      this.successMsg = `Your reservation is booked for ${this.reservedDate}`
    },
    (err:ErrorEvent)=>{
      this.errMsg = err.error.message;
    });
  }



}

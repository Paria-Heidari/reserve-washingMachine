import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignedIn = false;
  that;
  auth;
  userId;
  constructor() { }

  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  onFirstComponentButtonClick(){
    this.invokeFirstComponentFunction.emit();
  }


}

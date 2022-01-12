import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isSignedIn;
  auth;
  userId;
  checkedUser;
  static loginFlag = false;
  static authUserId ='';
  constructor(private authService: AuthService) { }

  ngOnInit() {

    window["gapi"].load('client:auth2', () => {
      // init, return a promise is an object
      window["gapi"].client
        .init({
          clientId:
          '743101781333-1vrfhadgjej2dg6jaem5942cpj7j4nsg.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window["gapi"].auth2.getAuthInstance();
          // this.onAuthChange();
          this.isSignedIn = this.auth.isSignedIn.get();
          // arrow find automatically invoked after a library has successfully initialized itself
        }).then(() => {
          this.auth = window["gapi"].auth2.getAuthInstance();
          this.isSignedIn = this.auth.isSignedIn.get();
          this.auth.isSignedIn.listen(this.onAuthChange);
          this.userId = this.auth.currentUser.get().getId();
          if (this.userId != null){
            AuthComponent.authUserId = this.userId;
          }else{
            AuthComponent.authUserId = '';
          }
        })
      });
  }


  public onAuthChange() {
    if(this != undefined){
      this.isSignedIn = this.auth.isSignedIn.get();
    }
  }

  public onSignIn=()=>{
    this.auth.signIn();
    AuthComponent.loginFlag = true;
    console.log("You are SignIn");
    this.isSignedIn = true;
  }

  public onSignOut=()=>{
    this.auth.signOut();
    AuthComponent.loginFlag = false;
    console.log("You are signOut");
    this.isSignedIn = false;
    location.reload();
  }

  public checkLoginForAnotherComponent(){
    if (this.authService.subsVar==undefined) {
      this.authService.subsVar = this.authService.
      invokeFirstComponentFunction.subscribe(() => {
        if(this.isSignedIn){
          this.userId = this.auth.currentUser.get().getId();
          return this.checkedUser;
        }else{
          this.userId = '';
          this.checkedUser = false;
          return this.checkedUser;
        }
      });
    }
  }

}



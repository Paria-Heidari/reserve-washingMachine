import { Component, OnInit } from '@angular/core';
declare var gapi: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isSignedIn;
  auth;
  constructor() { }

  ngOnInit() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
          '743101781333-1vrfhadgjej2dg6jaem5942cpj7j4nsg.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.isSignedIn = this.auth.isSignedIn.get();
        });
    });
  }

  //   gapi.load('client', () => {
  //     console.log('loaded client')

  //     gapi.client.init({
  //       clientId: '743101781333-1vrfhadgjej2dg6jaem5942cpj7j4nsg.apps.googleusercontent.com',
  //       scope: 'email'
  //     })
  //   })

  // }

}



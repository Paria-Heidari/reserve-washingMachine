import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}


// private auth2: gapi.auth2.GoogleAuth;
//   private subject= new ReplaySubject<gapi.auth2.GoogleUser>(1);

//   constructor() {
//     gapi.load('auth2', () =>{
//       gapi.auth2.init({
//         client_id: '743101781333-1vrfhadgjej2dg6jaem5942cpj7j4nsg.apps.googleusercontent.com'
//       })
//     })
//    }

//   public signIn(){
//     this.auth2.signIn({
//       scope: 'https://www.googleapis.com/auth/gmail.readonly'
//     }).then(user => {
//       this.subject.next(user);
//     }).catch(error => {
//       this.subject.next(null);
//     })
//   }

//   public signOut(){
//     this.auth2.signOut()
//       .then(() => {
//         this.subject.next(null);
//       })
//   }

//   public Observable() {
//     return this.subject.asObservable();
//   }

// }

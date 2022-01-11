import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'washIt';
}

// export class AppComponent implements OnInit{
//   title = 'washIt';
//   user;
//   constructor(private authService:AuthService, private ref: ChangeDetectorRef){

//   }
//   ngOnInit() {

//     this.authService.Observable().subscribe( user => {
//       this.user = user;
//       this.ref.detectChanges();
//     })
//   }

//   signIn(){
//     this.authService.signIn();
//   }

//   signup(){
//     this.authService.signOut();
//   }

// }

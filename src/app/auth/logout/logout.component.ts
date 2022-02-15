
import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _AuthService:AuthenticationService, private _Router:Router) {

      if (this._AuthService.currentUser.getValue() != null) {

        let token: any = this._AuthService.currentUser.getValue();
        this._AuthService.signOut(token).subscribe((response:any)=>{
      

          if (response.message=="Successfully logged out")
          {
            localStorage.removeItem('token');
            this._AuthService.currentUser.next(null);

            this._Router.navigate(["/home"]);

          }
          else if  (response.message == "token expired, please login") {
            alert("token expired, please login");

            this._Router.navigate(['/auth/login']);
          }
           else
          {
            alert('You already signed out');
          }

        });

      }
      else
      {
        alert('You already signed out');
      }








   }

  ngOnInit(): void {
  }

}


import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  public token:any;

  constructor(private _AuthService:AuthenticationService, private _Router:Router) {

    this.getUserData()
    this.signOut()  }










   private signOut()
   {
    this._AuthService.signOut(this.token).subscribe((response:any)=>{

      if (response.message=="Successfully logged out")
      {
        this._AuthService.currentUser.next(null);

        localStorage.clear();

        this._Router.navigate(["/home"]);
      }
      else
      {
        alert('You already signed out');
      }
       if  (response.message == "token expired, please login") {
        localStorage.clear();
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);
      }




    });

   }





   private getUserData() {
    this._AuthService.currentUser.subscribe(() => {
      this.token = this._AuthService.currentUser.getValue();


    })
  }

  ngOnInit(): void {


  }

}

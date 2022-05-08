
import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  public token: any;

  public isTokenExpired: boolean = false;
  public error: any = '';

  public isError: boolean = false;


  constructor(private _AuthService: AuthenticationService, private _Router: Router) {

    this.getUserData()
    this.signOut()
  }


  public closeTokenExpirationNotification(data: any) {
    this.isTokenExpired = data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }
  public closeErrorNotification(data: any) {
    this.isError = data;

  }








  private signOut() {
    this._AuthService.signOut(this.token).subscribe((response: any) => {

      if (response.message == "Successfully logged out") {
        this._AuthService.currentUser.next(null);

        localStorage.clear();

        this._Router.navigate(["/home"]);
      }
      else {
         this.error='You already signed out';
         this.isError=true;
      }
      if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
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

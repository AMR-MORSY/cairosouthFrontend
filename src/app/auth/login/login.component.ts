import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;
  isError: boolean = false;
  public isTokenExpired :boolean=false;





  constructor(private _AuthService:AuthenticationService, private _Router:Router) { }
  loginForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    }
  )


  public disableNotfication()
  {
    this.isError=false;
    this.isTokenExpired = false;

  }
  public closeTokenExpirationNotification(data: any) {
    this.isTokenExpired = data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }

submitLogin(submitData: any) {

  this._AuthService.signIn(submitData.value).subscribe((response:any) => {
    if (response.message == "token expired, please login") {
      this.error = "token expired, please login";
      this.isTokenExpired = true;
    }



   else if (response.message =="success") {

      this._AuthService.saveCurrentUser(response.access_token);


    }
    else {
      this.error=response.error;



         this.isError=true;


    }

  })

}



  ngOnInit(): void {
  }

}

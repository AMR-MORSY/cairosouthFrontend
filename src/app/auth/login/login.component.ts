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





  constructor(private _AuthService:AuthenticationService, private _Router:Router) { }
  loginForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    }
  )

  disableEmailNotfication()
  {
    this.isError=false;
  }
  disablePassNotfication()
  {
    this.isError=false;
  }

submitLogin(submitData: any) {

  this._AuthService.signIn(submitData.value).subscribe((response) => {
    console.log(response);

    if (response.message == 'success') {
      // let token:any=JSON.stringify(response.access_token);
      this._AuthService.saveCurrentUser(response.access_token);
      // this._Router.navigate(['/user']);

      // localStorage.setItem('userToken', response.token);
      // if (response.profile_picture != null) {
        // localStorage.setItem('userAvatar', response.profile_picture);

      // }
      // else
        // localStorage.setItem('userAvatar', '');


      // localStorage.setItem('userName', response.user_name);
      // localStorage.setItem('userType', response.user_type);
      // localStorage.setItem('user_id', response.user_id);

      // this._AuthService.saveCurrentUser();
      // this._Router.navigate(['/home']);


    }
    else {
      this.error=response.errors;
      console.log(this.error);


         this.isError=true;











      // if (this.error.password_errors != null && this.error.email_errors == null) {
        // this.isError_email = false;
        // this.isError_pass=true;

        // this.error_pass = this.error.password_errors;

      // }
      // else if (this.error.password_errors == null && this.error.email_errors != null) {
        // this.isError_email = true;
        // this.isError_pass = false;
        // this.error_email = this.error.email_errors;

      // }
      // else {
        // this.isError_email = true;
        // this.isError_pass = true;
        // this.error_email = this.error.email_errors;
        // this.error_pass = this.error.password_errors;

      // }


    }

  })

}





  ngOnInit(): void {
  }

}

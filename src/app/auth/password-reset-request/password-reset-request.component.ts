import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {
  public error: any;
public isError: boolean = false;
public isEmailError: boolean = false;
public emailError:any='';
public isSuccess: boolean = false;
  public isTokenExpired: boolean = false;

  public success: any = '';




  constructor(private _AuthService:AuthenticationService, private _Router:Router) { }

  resetRequest = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),

    }
  )
  disableEmailNotfication()
  {
    this.isError=false;
  }
  closeSuccessNotification(data: any) {
    this.isSuccess = data;


  }
  public closeTokenExpirationNotification(data: any) {
    this.isTokenExpired = data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }

submitEmail(data: any) {

  this._AuthService.sendPassResEmail(data.value).subscribe((response:any) => {
    console.log(response);
    if (response.message == "token expired, please login") {
      this.error = "token expired, please login";
      this.isTokenExpired = true;
    }
    else if (response.message=='failed')
    {

      this.error=response.error;
      this.isError=true

    }
    else
    {
      this.success=response.message;
      this.isSuccess=true
    }


  });
  }
  ngOnInit(): void {
  }

}

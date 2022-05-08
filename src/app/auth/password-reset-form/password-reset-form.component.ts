import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent implements OnInit {

  public isError_email: boolean = false;
  public isError_pass: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public error:any='';
  public success:any='';


  public error_email: any;
  public error_pass: any;



  constructor(private _AuthService: AuthenticationService, private _Router: Router) { }

  resetForm = new FormGroup({

    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern('')]),
    password_confirmation: new FormControl(null, [Validators.required]),
  })
  dissablePassNotifications() {
    this.isError_pass = false;
  }
  dissableconfPassNotifications() {
    this.isError_pass = false;
  }
  dissableemailNotifications() {
    this.isError_email = false;
  }

  closeSuccessNotification(data: any) {
    this.isSuccess = data;
    this._Router.navigate(['/auth/login']);


  }

  public closeErrorNotification(data: any) {
    this.isError = data;

  }

  submitResetForm(resetForm: any) {
    this._AuthService.sendPassResForm(resetForm.value).subscribe((feedback: any) => {
      console.log(feedback);
      if (feedback.message == 'success') {
        // this._AuthService.saveCurrentUser(feedback.access_token);
        this.success='password changed successfully';
        this.isSuccess=true;


      }
      else {
        let error: any = feedback.errors;
        if(error=='email does not exist')
        {
          this.error='Email does not exist';
          this.isError=true
        }

        if (error.email != null) {
          this.error_email = error.email;
          this.isError_email = true;
          console.log(this.error_email);

        }
        if (error.password != null) {
          this.error_pass = error.password;
          this.isError_pass = true;
        }


      }


    });
  }



  ngOnInit(): void {
  }

}

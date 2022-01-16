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

  isError_email: boolean = false;
isError_pass: boolean = false;

error_email: any;
error_pass: any;


  constructor(private _AuthService: AuthenticationService, private _Router: Router) { }

  resetForm = new FormGroup({

    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern('')]),
    password_confirmation: new FormControl(null, [Validators.required]),
  })
  dissablePassNotifications()
  {
   this. isError_pass = false;
  }
  dissableconfPassNotifications()
  {
   this. isError_pass = false;
  }
  dissableemailNotifications()
  {
    this.isError_email= false;
  }

  submitResetForm(resetForm:any) {
    this._AuthService.sendPassResForm(resetForm.value).subscribe((feedback:any) => {
      console.log(feedback);
      if (feedback.message=='success')
      {
        this._AuthService.saveCurrentUser(feedback.access_token);


      }
      else
      {
        let error:any=feedback.error;
       alert(`${error}`);
        if (error.email != null) {
          this.error_email = error.email;
           this.isError_email=true;
           console.log(this.error_email);

         }
         if (error.password != null) {
           this.error_pass = error.password;
           this.isError_pass=true;
           }


      }


    });
  }



  ngOnInit(): void {
  }

}

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isError_email: boolean = false;
  isError_pass: boolean = false;
  isError_user_name: boolean = false;
  error_email: any;
  error_pass: any;
  error_user_name: any;

  constructor(private _AuthService: AuthenticationService, private _Router: Router) { }
  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern('')]),
    password_confirmation: new FormControl(null, [Validators.required]),
  })
  dissablePassNotifications()
  {

   this. isError_pass = false;

  }
  dissableUserNotifications()
  {
   this. isError_user_name=false;

  }
  dissableconfPassNotifications()
  {
   this. isError_pass = false;

  }
  dissableemailNotifications()
  {
    this.isError_email= false;

  }

  submitRegisterForm(registerForm: FormGroup) {
    this._AuthService.makeRegisteration(registerForm.value).subscribe((feedback) => {
      console.log(feedback);
      if (feedback.message!='failed')
      {
        // let token:any=JSON.stringify(feedback.access_token);

        this._AuthService.saveCurrentUser(feedback.access_token);
       

      }
      else
      {
        let error:any=feedback.errors;
        console.log(error);
        if (error.email != null) {
          this.error_email = error.email;
           this.isError_email=true;
           console.log(this.error_email);

         }
         if (error.password != null) {
           this.error_pass = error.password;
           this.isError_pass=true;
           }
           if (error.user_name != null) {
            this.error_user_name = error.user_name;
             this.isError_user_name=true;
            }


      }


    });
  }

  ngOnInit(): void {
  }

}

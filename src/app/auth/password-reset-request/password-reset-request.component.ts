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
submitEmail(submitData: any) {

  this._AuthService.sendPassResEmail(submitData.value).subscribe((response:any) => {
    console.log(response);
  });
  }
  ngOnInit(): void {
  }

}

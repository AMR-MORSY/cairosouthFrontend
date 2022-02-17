import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SuperAdminService } from '../super-admin.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  public token: any;
  public id: any;
  public selected_user: any;
  public user_id: any;
  public userForm = new FormGroup({

    role: new FormControl(null)

  });

  constructor(private _SuperAdminService: SuperAdminService, private _AuthServices: AuthenticationService, private _Router: Router) { }

  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;

  }
  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      this.token = this._AuthServices.currentUser.getValue();
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;

    })
  }

  public submitUserForm(userForm: any) {
    let data = {
      'id': this.id,
      'role': userForm.value.role,
      'token': this.token,
      'user_id': this.user_id
    };
    this._SuperAdminService.updateUser(data).subscribe((response: any) => {
      console.log(response)
      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      if (response.message=='success')
      {
        alert('user Updated Successfully')
        this._Router.navigate(['/super-admin/users'])
      }
      else
      {
        let error=response.errors;
        alert(JSON.stringify(error))
      }
    })

  }
  private getSelectedUser() {
    this._SuperAdminService.user.subscribe(() => {

      this.selected_user = this._SuperAdminService.user.getValue()
      if (this.selected_user == null) {
        this._Router.navigate(['/super-admin/users']);
      }
      else {
        this.user_id = this.selected_user.id;
        console.log(this.user_id)

        this.userForm = new FormGroup({

          role: new FormControl(this.selected_user.role)

        })

      }

    })
  }
  ngOnInit(): void {
    this.getUserData();
    this.getSelectedUser();
  }

}

import { AdminService } from './../../admin/admin.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _AuthService:AuthenticationService, private _Router:Router, private _AdminServices:AdminService) {
    this._AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() != null) {

        let token: any = this._AuthService.currentUser.getValue();
        this._AuthService.signOut(token).subscribe((response)=>{

          if (response!=null)
          {
            localStorage.removeItem('token');
            this._AuthService.currentUser.next(null);
            this._AdminServices.isAdmin.next(false);
            this._Router.navigate(["/home"]);

          }
          else
          {
            alert('You already signed out');
          }

        });

      }
      else
      {
        alert('You already signed out');
      }

    });






   }

  ngOnInit(): void {
  }

}

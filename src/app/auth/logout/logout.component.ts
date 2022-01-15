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

      localStorage.removeItem('token');
      this._AuthService.currentUser.next(null);
      this._AdminServices.isAdmin.next(false);

      this._Router.navigate(["/home"]);

   }

  ngOnInit(): void {
  }

}

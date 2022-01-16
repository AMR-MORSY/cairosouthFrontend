import { Router } from '@angular/router';
import { SitesService } from './../sites.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userId:any;
  public user_token:any;

  constructor(private _AuthService:AuthenticationService, private _siteServices:SitesService, private _Router:Router) { }

  public getSitesStatestics(token:any)
  {
    this._siteServices.showStatistics(token).subscribe((response)=>{
      console.log(response);

    });

  }






  ngOnInit(): void {

    if (this._AuthService.currentUser.getValue() != null) {
      let token: any = this._AuthService.currentUser.getValue();

      this.getSitesStatestics(token)


    }
    else {
      this.user_token=null ;
      this.userId=null;

    }
  }



}

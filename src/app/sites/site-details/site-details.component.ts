import jwt_decode from "jwt-decode";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../../auth/authentication.service";
import { SitesService } from "../sites.service";



@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {

  public token: any;
  public isAdmin: boolean = false;
  public isSuperAdmin: boolean = false;
  public id: any;
  public site: any;
  public site_id: any;


  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;

  }
  private isAdminCheck(role: any) {
    if (role == "admin") {
      return true;
    }
    else {
      return false;
    }

  }
  isSuperAdminCheck(role: any) {
    if (role == "super admin") {
      return true;
    }
    else {
      return false;
    }
  }

  private getUserData() {
    this._AuthService.currentUser.subscribe(() => {
      this.token = this._AuthService.currentUser.getValue();
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;
      this.isAdmin = this.isAdminCheck(decToken.role);
      this.isSuperAdmin = this.isSuperAdminCheck(decToken.role);
    })

  }

  private getSite() {
    this._siteService.site.subscribe(() => {
      this.site = this._siteService.site.getValue();
      console.log(this.site);
      this.site_id = this.site[0].id

    })

  }


  private getSiteCascades() {
    let tokenId = {
      "token": this.token,
      "site_id": this.site[0].id
    }

    this._siteService.getCascades(tokenId).subscribe((response: any) => {
      console.log(response);
      if (response.message == "token expired, please login") {
        alert("token expired, please login");

        this._Router.navigate(['/auth/login']);
      }
    });

  }

  public goToUpdate()
  {
    this._Router.navigate(['/sites/update-cascades']);
  }
 public  goToCreatSite()
  {
    this._Router.navigate(['/sites/create-new-site'])
  }
  public goToSiteModifications()
  {
    this._Router.navigate(['/modifications/show-site-modifications'])

  }


  constructor(private _siteService: SitesService, private _Router: Router, private _AuthService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserData();
    console.log(this.id);
    this.getSite();
    console.log(this.site[0].id);
    this.getSiteCascades();
  }

}

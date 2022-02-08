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
  public cascades: any;
  public isCascadesFound: boolean = false;
  public nodals: any;
  public isNodalsFound: boolean = false;
  public cascadesCount: any;
  public isNodalFound: boolean = false;
  public nodal: any;
  public isNotificationShown:boolean=false;


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

  public closeNotification()
  {
    this.isNotificationShown=false;
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
  public deleteSite()
  {
    let data={
      "id":this.id,
      "site_id":this.site_id,
      "token":this.token
    }
    this._siteService.deleteSite(data).subscribe((response)=>{
      console.log(response)
      if (response.message=="success")
      {
        alert("site deleted")
        this._Router.navigate(['/home'])
      }
      else{
        let error=response.errors
        alert(JSON.stringify(error));

      }

    })

  }

  //////////////////////////////////////////////////////////////////////////////

  /////////subscribe to the site stored in the behaviour subject

  private getSite() {
    this._siteService.site.subscribe(() => {
      this.site = this._siteService.site.getValue();
      console.log(this.site)
      this.site_id = this.site.id





    })



  }


  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////click on Nodals or normal cascades to go to site details page again

  public getSiteDataFromDB(site_id: any) {
    let data = {
      "site_id": site_id,
      "token": this.token

    }



    this._siteService.getsite(data).subscribe((response: any) => {
      console.log(response)


      if (response.message == "success") {
        this.site = response.site;
        this.goToSiteDetails();
        this.site_id = this.site.id
        this._siteService.site.next(this.site);

        localStorage.setItem("site", JSON.stringify(this.site));

        this.getSiteCascades();
        this.getSiteNodal();


      }
      else if (response.message == "token expired, please login") {
        alert("token expired, please login");

        this._Router.navigate(['/auth/login']);
      }





    })

  }



  private goToSiteDetails() {
    console.log(this.site)
    if (this.site == null) {

      this._Router.navigate(['/**']);
    }


  }

  ///////click on nodal//////
  public goToSiteDetailsFromNodals(index: any) {

    this.getSiteDataFromDB(index);

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////get main site's cascades
  public getSiteCascades() {


    let tokenId = {
      "token": this.token,
      "nodal_id": this.site_id
    }

    this._siteService.getCascades(tokenId).subscribe((response: any) => {
      console.log(response);
      this.cascades = [];
      this.nodals = [];

      function updateCascades(nodals: any, cascades: any) {
        for (var i = 0; i < nodals.length; i++) {
          for (var j = 0; j < cascades.length; j++) {
            if (nodals[i].cascade_code === cascades[j].cascade_code)
              cascades.splice(cascades[j], 1)
          }

        }
        return cascades;


      }
      if (response.message == "token expired, please login") {
        alert("token expired, please login");

        this._Router.navigate(['/auth/login']);
      }

      else if (response.message == "success") {

        this.isCascadesFound = true;
        this.cascades = response.cascades;
        this.cascadesCount = response.count_cascades;
        this.nodals = response.nodals
        this._siteService.nodals.next(this.nodals)
        localStorage.setItem('nodals', JSON.stringify(this.nodals));
        this._siteService.cascades.next(this.cascades);
        localStorage.setItem('cascades', JSON.stringify(this.cascades));



        if (this.nodals.length == 0) {
          this.isNodalsFound = false
        }
        else {
          this.cascades = updateCascades(this.nodals, this.cascades);
          this._siteService.cascades.next(this.cascades);
          localStorage.setItem('cascades', JSON.stringify(this.cascades));





          this.isNodalsFound = true;

        }



      }
      else {
        this.isNodalsFound = false;
        this.isCascadesFound = false;
      }
    });



  }
  /////////////////////////////////////////////////////////////////////////////////////////

  ////////go to update site cascades page

  public goToUpdateCascades() {
     this._siteService.nodals.next(this.nodals)
     localStorage.setItem('nodals', JSON.stringify(this.nodals));
     this._siteService.cascades.next(this.cascades);
     localStorage.setItem('cascades', JSON.stringify(this.cascades));


    this._Router.navigate(['/sites/update-cascades']);
  }
  ///////////////////////////////////////////////////////

  ///////go to site modification page
  public goToSiteModifications() {
    this._Router.navigate(['/modifications/show-site-modifications'])

  }
  //////////////////////////////////////////////////////////////////////////////

  /////////go to update main site page

  public goToUpdateSite() {

    this._Router.navigate(['sites/update-site']);
  }
  ////////////////////////////////////////////////////////////////////////

  ////////get the nodal-site the main site is connected to

  public getSiteNodal() {
    let tokenId = {
      "token": this.token,
      "site_id": this.site_id
    }

    this._siteService.getNodal(tokenId).subscribe((response: any) => {

      if (response.message == "token expired, please login") {
        alert("token expired, please login");

        this._Router.navigate(['/auth/login']);
      }
      else if (response.message == "success") {
        this.isNodalFound = true;
        this.nodal = response;


      }
      else {
        this.isNodalFound = false;
      }

    });


  }
  ////////////////////////////////////////////////////////////////


  constructor(private _siteService: SitesService, private _Router: Router, private _AuthService: AuthenticationService) { }

  ngOnInit(): void {


    this.getUserData();

    this.getSite();

    this.getSiteCascades();

    this.getSiteNodal();
  }

}

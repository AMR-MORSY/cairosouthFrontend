import jwt_decode from "jwt-decode";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../../auth/authentication.service";
import { SitesService } from "../sites.service";
import { NurService } from "src/app/nur/nur.service";



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
  public showDeleteNotification:boolean=false;
  public totalIndirectCascades:any[]=[];
  public countIndirectCascades:any=0;
  public countDirectIndirect:any;
  public isInirectCascadesFound:boolean=false;
 public isCascadesNotificationShown:boolean=false;
 public isTokenExpired:boolean=false;
 public error:any='';

 public isSuccess: boolean = false;

 public success: any = '';
 public isError: boolean = false;







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
 private isSuperAdminCheck(role: any) {
    if (role == "super admin") {
      return true;
    }
    else {
      return false;
    }
  }

  public showIndirectCascadesList()
  {
    this.isCascadesNotificationShown=true;
  }
  public closeCascadesNotification()
  {
    this.isCascadesNotificationShown=false;

  }

  public goToShowSiteNur()
  {
    this._Router.navigate(['/nur/show-site-nur'])
  }

  closeSuccessNotification(data: any) {
    this.isSuccess = data;
    this._Router.navigate(['/sites/allSites'])


  }
  public closeTokenExpirationNotification(data: any) {
    this.isTokenExpired = data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }
  public closeErrorNotification(data: any) {
    this.isError = data;

  }

  public closeDeleteNotification()
  {
    this.showDeleteNotification=false;
  }

  public openDeleteNotification()
  {
    this.showDeleteNotification=true;

  }

  private getUserData() {
    this._AuthService.currentUser.subscribe(() => {
      this.token = this._AuthService.currentUser.getValue();
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;
      if (decToken. role == "super admin") {
        this.isAdmin=true;
        this.isSuperAdmin=true;
      }
      else if(decToken. role == "admin") {
        this.isAdmin= true;
        this.isSuperAdmin = false;
      }
      else{
      this.isAdmin = false;
      this.isSuperAdmin = false;}
    })

  }
  public deleteSite()
  {
    let data={
      "id":this.id,
      "site_id":this.site_id,
      "token":this.token
    }
    this.showDeleteNotification=false;
    this._siteService.deleteSite(data).subscribe((response)=>{
      console.log(response)
      if (response.message=="success")
      {
        this.success="site deleted";
        this.isSuccess=true;

      }
      else if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
      }
      else{
        let error=response.errors
         error=JSON.stringify(error);
         this.error=error;
         this.isError=true

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



      if (response.message == "success") {
        this.site = response.site;
        this.isTokenExpired=false;
        this.goToSiteDetails();
        this.site_id = this.site.id
        this._siteService.site.next(this.site);

        localStorage.setItem("site", JSON.stringify(this.site));

        this.getSiteCascades();
        this.getSiteNodal();


      }
      else if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
      }





    })

  }



  private goToSiteDetails() {
    console.log(this.site)
    if (this.site == null) {

      this._Router.navigate(['/**']);
    }


  }

  public goToShowSiteNUR()
{

  this._NURService.site_code.next(this.site.site_code);
  localStorage.setItem('site_code',this.site.site_code);
  this._Router.navigate(['/nur/show-site-nur'])
}

  ///////click on nodal//////
  public goToSiteDetailsFromNodals(index: any) {

    this.isCascadesNotificationShown=false;

    this.getSiteDataFromDB(index);

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////get main site's cascades
  public getSiteCascades() {


    let tokenId = {
      "token": this.token,
      "nodal_id": this.site_id
    }
    this.cascades = [];
    this.nodals = [];
    this.totalIndirectCascades=[];
    this.countDirectIndirect=0;
    this.countIndirectCascades=0;

    this._siteService.getCascades(tokenId).subscribe((response: any) => {
      console.log(response);


      function updateCascades(nodals: any, cascades: any) {
        for (var i = 0; i < nodals.length; i++) {
          for (var j = 0; j < cascades.length; j++) {
            if (nodals[i].cascade_code == cascades[j].cascade_code)
              cascades.splice(j, 1)
          }

        }
        console.log(cascades)
        return cascades;


      }
      if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
      }

      else if (response.message == "success") {

        this.isCascadesFound = true;
        this.isTokenExpired = false;
        let cascades:any = response.cascades;
        this.cascadesCount = response.count_cascades;
        this.totalIndirectCascades=response.total_indirect_cascades;
        if(this.totalIndirectCascades.length>0)
        {
          this.isInirectCascadesFound=true;
        }
        else
        {
          this.isInirectCascadesFound=false;
        }
        this.countIndirectCascades=this.totalIndirectCascades.length;
        this.countDirectIndirect=this.countIndirectCascades+this.cascadesCount;
        let nodals:any = response.nodals

        if (nodals.length == 0) {
          this.isNodalsFound = false
          this.cascades=cascades;
        }
        else {
          this.cascades = updateCascades(nodals, cascades);
          this.nodals=nodals;

          this.isNodalsFound = true;

        }



      }
      else {
        this.isNodalsFound = false;
        this.isCascadesFound = false;
        this.isInirectCascadesFound=false;
        this.isTokenExpired = false;

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
      console.log(response)

      if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
      }
      else if (response.message == "success") {
        this.isNodalFound = true;
        this.isTokenExpired = false;
        this.nodal = response;


      }
      else {
        this.isNodalFound = false;
        this.isTokenExpired = false;
      }

    });


  }
  ////////////////////////////////////////////////////////////////


  constructor(private _siteService: SitesService, private _NURService:NurService,private _Router: Router, private _AuthService: AuthenticationService) { }

  ngOnInit(): void {


    this.getUserData();

    this.getSite();

    this.getSiteCascades();

    this.getSiteNodal();
  }

}

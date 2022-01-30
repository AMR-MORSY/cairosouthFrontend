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
  public cascades:any;
  public isCascadesFound:boolean=false;
  public nodals:any;
  public isNodalsFound:boolean=false;
  public cascadesCount:any;
  public isNodalFound:boolean=false;
  public nodal:any;


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

public goToSiteDetails()
{
  
}
  private getSiteCascades() {
    let tokenId = {
      "token": this.token,
      "site_id": this.site[0].id
    }

    this._siteService.getCascades(tokenId).subscribe((response: any) => {
      console.log(response);
      function updateCascades(nodals:any, cascades:any)
      {
        for(var i=0; i<cascades.length;i++)
        {
          let savedNodals:any=nodals.filter((site:any)=>{
            return site.cascade_code==cascades[i].cascade_code;
          })
          if (savedNodals.length>0)
          {
            let index=cascades.indexOf(cascades[i])
            cascades.splice(index,1)
          }

        }


      }
      if (response.message == "token expired, please login") {
        alert("token expired, please login");

        this._Router.navigate(['/auth/login']);
      }

      else if (response.message=="success")
      {
        this.cascades=[];
        this.nodals=[];
        this.isCascadesFound=true;
        this.cascades=response.cascades;
        this.cascadesCount=response.count_cascades;
        this.nodals=response.nodals

        if (this.nodals.length==0)
        {
          this.isNodalsFound=false
        }
        else
        {
          // updateCascades(this.nodals,this.cascades);

          this.isNodalsFound=true;

        }



      }
      else
      {
        this.isNodalsFound=false;
        this.isCascadesFound=false;
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

  public goToUpdateSite()
  {
    this._Router.navigate(['sites/update-site']);
  }

  public getSiteNodal()
  {
    let tokenId = {
      "token": this.token,
      "site_id": this.site[0].id
    }

    this._siteService.getNodal(tokenId).subscribe((response: any) => {

      if (response.message == "token expired, please login") {
        alert("token expired, please login");

        this._Router.navigate(['/auth/login']);
      }
      else if (response.message=="success")
      {
        this.isNodalFound=true;
        this.nodal=response;


      }
      else
      {
        this.isNodalFound=false;
      }

    });


  }


  constructor(private _siteService: SitesService, private _Router: Router, private _AuthService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserData();
    console.log(this.id);
    this.getSite();
    console.log(this.site[0].id);
    this.getSiteCascades();
    this.getSiteNodal();
  }

}

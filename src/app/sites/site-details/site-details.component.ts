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
      this.site_id = this.site.id

    })

  }
///////////////////////////////////////////////////////////////
  private getCascadeId(index:any)
  {
    let site= this.cascades.filter((site:any)=>{
      return site.site_id==index;

    });
    return site.site_id;

  }

  private getSiteData(site_id:any)
  {
    let data={
      "site_id":site_id,
      "token":this.token

    }

    let site:any="failed";
  

    this._siteService.getsite(data).subscribe((response:any)=>{
      console.log(response)
      if (response.message=="success")
      {
          site=response;
      }



    })
    return site;
  }



  private getNodalId(index:any)
  {
    let site= this.nodals.filter((site:any)=>{
      return site.site_id==index;
    });

    let site_id=site[0].site_id
    return site_id;
  }

  private goToSiteDetails(site:any)
  {
    console.log(site)
    if (site=="failed")
    {

      this._Router.navigate(['/**']);
    }
    else
    {
       this._siteService.site.next(site);
       localStorage.setItem("site", JSON.stringify(site));
       this._Router.navigate(['/sites/site-details']);
     }

  }
public goToSiteDetailsFromNodals(index:any,)
{
  let site_id:any=this.getNodalId(index);
  let site=this.getSiteData(site_id);
  this.goToSiteDetails(site);



}

public goToSiteDetailsFromCascades(index:any)
{
  let site_id:any=this.getCascadeId(index);
  let site:any=this.getSiteData(site_id);

  this.goToSiteDetails(site);

}

/////////////////////////////////////////////////////////////////////////////////////////////
  private getSiteCascades() {
    let tokenId = {
      "token": this.token,
      "site_id": this.site.id
    }

    this._siteService.getCascades(tokenId).subscribe((response: any) => {

      function updateCascades(nodals:any, cascades:any)
      {
        for(var i=0; i<nodals.length;i++)
        {
          for (var j=0;j<cascades.length;j++)
          {
            if (nodals[i].cascade_code===cascades[j].cascade_code)
            cascades.splice(cascades[j],1)
          }

        }
        return cascades;


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
        console.log(response)
        this.cascades=response.cascades;
        this.cascadesCount=response.count_cascades;
        this.nodals=response.nodals

        if (this.nodals.length==0)
        {
          this.isNodalsFound=false
        }
        else
        {
          this.cascades= updateCascades(this.nodals,this.cascades);
          console.log(this.cascades)

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
      "site_id": this.site.id
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
    console.log(this.site.id);
    this.getSiteCascades();
    this.getSiteNodal();
  }

}

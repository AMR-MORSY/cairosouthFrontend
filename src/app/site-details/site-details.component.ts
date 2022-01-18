import jwt_decode from "jwt-decode";
import { SitesService } from './../sites.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {

  public token:any;
  public isAdmin:boolean=false;
  public isSuperAdmin:boolean=false;
  public id:any;
  public site:any

 private decodeToken(token:any)
  {
    let decToken=jwt_decode(token);
    return decToken;

  }
  private isAdminCheck(role:any)
  {
    if (role=="admin")
    {
      return true;
    }
    else
    {
      return false;
    }

  }
  isSuperAdminCheck(role:any)
  {
    if (role=="super admin")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  private getUserData()
  {
    this._siteService.token.subscribe(()=>{
      this.token=this._siteService.token.getValue();
      let decToken:any=this.decodeToken(this.token);
      this.id=decToken.id;
      this.isAdmin=this.isAdminCheck(decToken.role);
      this.isSuperAdmin=this.isSuperAdminCheck(decToken.role);
    })

  }

  private getSite()
  {
    this._siteService.site.subscribe(()=>{
      this.site=this._siteService.site.getValue();

    })

  }

  private getSiteCascades()
  {
    let tokenId={
      "token":this.token,
      "site_id":this.site[0].id
    }

    this._siteService.getCascades(tokenId).subscribe((response:any)=>{
      console.log(response);
    })

  }
  constructor(private _siteService:SitesService) { }

  ngOnInit(): void {
    this.getUserData();
    console.log(this.id);
    this.getSite();
    console.log(this.site);
    this.getSiteCascades();
  }

}

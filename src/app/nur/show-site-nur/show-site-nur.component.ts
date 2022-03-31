import { NurService } from './../nur.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from 'src/app/sites/sites.service';

@Component({
  selector: 'app-show-site-nur',
  templateUrl: './show-site-nur.component.html',
  styleUrls: ['./show-site-nur.component.scss']
})
export class ShowSiteNurComponent implements OnInit {

  public siteCode:any='';
  private token:any='';

  constructor(private _NurServices:NurService,private _AuthServices: AuthenticationService, private _Router:Router) { }
  
  
  

  

  private getSiteCode()
  {
    this._NurServices.site_code.subscribe(()=>{
      if (this._NurServices.site_code.getValue()!=null)
      {
      this.siteCode=this._NurServices.site_code.getValue();
     
        console.log(this.siteCode)
      }

    })
  }
  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      if(this._AuthServices.currentUser.getValue()!=null)
      this.token = this._AuthServices.currentUser.getValue();
    })
  }

  ngOnInit(): void {

    this.getSiteCode();
    this.getUserData()


  }

}

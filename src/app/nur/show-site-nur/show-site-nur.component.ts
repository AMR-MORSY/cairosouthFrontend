import { NurService } from './../nur.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from 'src/app/sites/sites.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-show-site-nur',
  templateUrl: './show-site-nur.component.html',
  styleUrls: ['./show-site-nur.component.scss']
})
export class ShowSiteNurComponent implements OnInit {

  public siteCode:any='';
  private token:any='';
  public siteName:any='';
  public tickets:any[]=[];
  public isNURFound:boolean=false;
  public isTokenExpired:boolean=false;
  public isError:boolean=false;
  public error:any=';'

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
  public closeTokenExpirationNotification(data:any)
{
  this. isTokenExpired=data;
  localStorage.clear();
  this._Router.navigate(['/auth/login']);


}
public closeErrorNotification(data: any) {
  this.isError = data;

}

  public downloadSiteNur() {
    let filename = "siteNur.xlsx";
    this._NurServices.downloadSiteNur({ 'filename': filename }, this.siteCode,this.token).subscribe((data) => {
    

      if (data.message == "token expired, please login") {
        this.error="token expired, please login";
        this.isTokenExpired=true;
        this.isError = false;

      }
      saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), filename)

    });

  }
  private getSiteNUR()
  {
    this._NurServices.getSiteNUR(this.siteCode,this.token).subscribe((response)=>{
      console.log(response);
      if (response.message=='success')
      {
        this.siteName=response.NUR.site_name;
        this.tickets=response.NUR.tickets;
        this.isNURFound=true;
        this.isTokenExpired=false;
        this.isError = false;

      }
      else if (response.message == "token expired, please login") {
        this.error="token expired, please login";
        this.isTokenExpired=true;
        this.isError = false;
        this.isNURFound=false;

      }
      else
      {
        this.isNURFound=false;
        this.isTokenExpired=false;
        this.isError=true;
        let error:any=response.errors;
       error=JSON.stringify(error)
       this.error=error;
      }
    })
  }

  ngOnInit(): void {

    this.getSiteCode();
    this.getUserData();
    this.getSiteNUR();


  }

}

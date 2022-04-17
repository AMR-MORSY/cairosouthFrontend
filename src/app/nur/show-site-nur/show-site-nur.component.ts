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

  public downloadSiteNur() {
    let filename = "siteNur.xlsx";
    this._NurServices.downloadSiteNur({ 'filename': filename }, this.siteCode,this.token).subscribe((data) => {
      console.log(data);
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

      }
      else if (response.message == "token expired, please login") {
        localStorage.clear();
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);
      }
      else
      {
        let error:any=response.errors;
        alert(JSON.stringify(error))
      }
    })
  }

  ngOnInit(): void {

    this.getSiteCode();
    this.getUserData();
    this.getSiteNUR();


  }

}

import { Router } from '@angular/router';
import { AuthenticationService } from './../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/sites/sites.service';
import { ModificationsService } from '../modifications.service';
import { saveAs } from 'file-saver';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-show-site-modifications',
  templateUrl: './show-site-modifications.component.html',
  styleUrls: ['./show-site-modifications.component.scss']
})
export class ShowSiteModificationsComponent implements OnInit {


  public site: any;
  public site_id: any;
  public token: any;
  public id: any;
  public data:any;
  public isModificationFound:boolean=false;

  constructor(private _siteService: SitesService,private _Router:Router, private _ModificationsServices: ModificationsService, private _AuthServices: AuthenticationService) { }

  private getSite() {
    this._siteService.site.subscribe(() => {
      this.site = this._siteService.site.getValue();
      this.site_id = this.site.id
    });
  }

  private generateRequestData() {
    let data = {
      "id": this.id,
      "site_id": this.site_id,
      "token": this.token
    }
    return data;
  }
  sendSiteId(index:any)
  {

  }

  private getSiteModifications() {
    let data = this.generateRequestData();

    this._ModificationsServices.getSiteModifications(data).subscribe((response: any) => {

      let error="";
      if (response.message=="failed")
      {
        error=JSON.stringify(response.errors);
        alert(error);

      }
      else  if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);
      }
      else
      {
        this.data=response.data;
        this.isModificationFound=true;
        console.log(this.data)

      }


    })

  }
  public downloadsites() {
    let filename = "allSites.xlsx";
    this._ModificationsServices.download({ 'filename': filename }).subscribe((data) => {
      console.log(data);
      saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), filename)

    });

  }
  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;
  }
  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      this.token = this._AuthServices.currentUser.getValue();
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;
    })
  }

  ngOnInit(): void {
    this.getSite();
    this.getUserData()
    this.getSiteModifications();
  }

}

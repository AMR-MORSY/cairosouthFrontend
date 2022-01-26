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
  public nodalCode: any = "";
  public nodalName: any = "";
  public site: any;
  public site_id: any;
  public token: any;
  public id: any;

  constructor(private _siteService: SitesService, private _ModificationsServices: ModificationsService, private _AuthServices: AuthenticationService) { }

  private getSite() {
    this._siteService.site.subscribe(() => {
      this.site = this._siteService.site.getValue();
      console.log(this.site);
      this.site_id = this.site[0].id
      this.nodalCode = this.site[0].site_Code;
      this.nodalName = this.site[0].site_name;
    })
  }

  private generateRequestData() {
    let data = {
      "id": this.id,
      "site_id": this.site_id,
      "token": this.token
    }
    return data;
  }

  private getSiteModifications() {
    let data = this.generateRequestData();
    console.log(data)
    this._ModificationsServices.getSiteModifications(data).subscribe((response: any) => {
      console.log(response);

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

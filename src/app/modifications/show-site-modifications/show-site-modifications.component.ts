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

  public modificationId: any;
  public site: any;
  public site_id: any;
  public token: any;
  public id: any;
  public data: any;
  public isModificationFound: boolean = false;
  public isModificationClicked: boolean = false;
  public isNotificationShown: boolean = false;
  public isError:boolean=false;
  public error:any='';
  public isTokenExpired:boolean=false;
  public isSuccess:boolean=false;
  public success:any='';

  constructor(private _siteService: SitesService, private _Router: Router, private _ModificationsServices: ModificationsService, private _AuthServices: AuthenticationService) { }

  private getSite() {
    this._siteService.site.subscribe(() => {
      this.site = this._siteService.site.getValue();

      this.site_id = this.site.id

    });
  }



  public closeErrorNotification(data: any) {
    this.isError = data;


  }
  closeSuccessNotification(data:any)

  {
    this.isSuccess=data;
    this.getSiteModifications();

  }
  public closeTokenExpirationNotification(data:any)
  {
    this. isTokenExpired=data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }
  private shadeElement(e: any) {

    let elementId: any = e.currentTarget.dataset.index;

    let x: any = document.querySelectorAll('.hambozo');
    for (var i = 0; i < x.length; i++) {
      if (i == elementId) {

        x[i].style.color = "red";
      }
      else {

        x[i].style.color = "black";
      }
    }

  }
  private generateShowRequestData() {
    let data = {
      "id": this.id,
      "site_id": this.site_id,
      "token": this.token
    }
    return data;
  }

  private getChosenMod() {
    let chosenMod = this.data.filter((mod: any) => {
      return mod.id == this.modificationId
    });

    return chosenMod[0];

  }

  goToUpdateModification() {
    let chosenMod = this.getChosenMod();
    this._ModificationsServices.modification.next(chosenMod);
    localStorage.setItem('modification', JSON.stringify(chosenMod))
    this._Router.navigate(['/modifications/update-modifications'])
  }

  private generateDeleteRequestData() {
    let data = {
      "id": this.id,
      "site_id": this.modificationId,
      "token": this.token
    }
    return data;
  }
  public sendSiteId(index: any, e: any) {
    this.shadeElement(e);
    this.modificationId = index;

    this.isModificationClicked = true;

  }

  public goToNewMod() {
    this._Router.navigate(['/modifications/create-new-modification'])

  }
  private getSiteModifications() {
    let data = this.generateShowRequestData();

    this._ModificationsServices.getSiteModifications(data).subscribe((response: any) => {


      if (response.message == "failed") {
        this.isModificationFound=false;

        this.isError = true;
        this.isTokenExpired=false;

        let error = response.errors
        error = JSON.stringify(error);

        this.error = error


      }
      else if (response.message == "token expired, please login") {
        this.error="token expired, please login";
        this.isTokenExpired=true;
        this.isError = false;
        this.isModificationFound=false;


      }
      else {
        this.data = response.data;
        this.isModificationFound = true;
        this.isError=false;
        this.isTokenExpired=false


      }


    })

  }

  public deleteModification() {
    let data = this.generateDeleteRequestData()
    this._ModificationsServices.deleteSiteModifications(data).subscribe((response) => {

      if (response.message == "token expired, please login") {
        this.error="token expired, please login";
        this.isTokenExpired=true;
        this.isError = false;

      }
      else if (response.message == "success") {
        this.success='Modification deleted Successfully';
        this.isSuccess = true;
        this.isTokenExpired=false;

        this.isNotificationShown = false;



      }

      else if (response.message == "failed") {

        this.isNotificationShown = false;
        this.isError = true;
        this.isTokenExpired=false;

        let error = response.errors
        error = JSON.stringify(error);

        this.error = error


      }

    })

  }
  public showNotification() {
    this.isNotificationShown = true;

  }

  public closeNotification() {
    this.isNotificationShown = false;

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

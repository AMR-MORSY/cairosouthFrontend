import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from '../sites.service';
import {saveAs} from 'file-saver';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-all-sites',
  templateUrl: './all-sites.component.html',
  styleUrls: ['./all-sites.component.scss']
})
export class AllSitesComponent implements OnInit {

  private token: any;
  public sites:any;
  public isDataFound: boolean = false;
  public config: any;
  public pagination_link: any;
  public fadefinished: boolean = false;
  public id:any;
  public isSuccess: boolean = false;
  public isTokenExpired: boolean = false;
  public error: any = '';
  public success: any = '';
  public isError: boolean = false;
  public showBackButton:boolean=false;
  public isAdmin:boolean=false;
  public isSuperAdmin:boolean=false;




  constructor(private _AuthServices: AuthenticationService, private _Router: Router, private _sitesService: SitesService) {



  }

  closeSuccessNotification(data: any) {
    this.isSuccess = data;


  }
  public closeTokenExpirationNotification(data: any) {
    this.isTokenExpired = data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }
  public closeErrorNotification(data: any) {
    this.isError = data;

  }


  public downloadAllNodals()
  {
    let filename = "allNodals.xlsx";
    this._sitesService.downloadAllNodals({ 'filename': filename },this.id,this.token).subscribe((data) => {
      console.log(data);
      saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), filename)

    });

  }
  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;
  }


  private getToken() {
    let token: any = this._AuthServices.currentUser.getValue();
    if (token == null) {
      this._Router.navigate(['/home']);

    }
    else {
      this.token = token;
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;
      if(decToken.role=='super admin')
      {
        this.isAdmin=true;
        this.isSuperAdmin=true;
      }
      else if(decToken.role=='admin')
      {
        this.isAdmin=true;
        this.isSuperAdmin=false;
      }
      else
      {
        this.isAdmin=false;
        this.isSuperAdmin=false;
      }


    }

  }

  public shadeElement(e: any) {

    let elementId: any = e.currentTarget.dataset.index;
    console.log(elementId)
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

  public sendSiteId(index: any) {

    let site = this.sites.filter((x: any) => {

      return x.id == index;


    });
     this. goToSiteDetailsWithSite(site[0]);


  }
  public goToSiteDetailsWithSite(site: any) {
    this._sitesService.site.next(site);
    localStorage.setItem("site", JSON.stringify(site));
    this._Router.navigate(['/sites/site-details']);


  }

  public downloadsites() {
    let filename = "allSites.xlsx";
    this._sitesService.download({ 'filename': filename }).subscribe((data) => {

      saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), filename)

    });

  }

  private displaySites() {

    this.getToken();
    this.sites=[];

    this._sitesService.getAllSites(this.token).subscribe((response) => {


      if (response.data != null) {
        this.sites = response.data;
        this.pagination_link = response.links.first;
        console.log(this.sites);
        this.config = {
          currentPage: response.meta.curent_page,
          itemsPerPage: response.meta.per_page,
          totalItems: response.meta.total
        }
        this.isDataFound = true;
        this.showBackButton=true;
      }
      else if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
        this.isDataFound = false;

      }
      else {
        this.isDataFound = false;
        this.showBackButton=true;
      }

    })






  }

  public goToCreateNew() {
    this._Router.navigate(['sites/create-new-site'])
  }

  public pageChange(newpage: any) {
    this.config.currentPage = newpage;
    this._sitesService.allSitesPagination(this.token, newpage).subscribe((response) => {
      if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
        this.isDataFound=false;
      }
      else

      this.sites = response.data;
    })


  }

  ngOnInit(): void {
    this.displaySites();
  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from '../sites.service';

@Component({
  selector: 'app-all-sites',
  templateUrl: './all-sites.component.html',
  styleUrls: ['./all-sites.component.scss']
})
export class AllSitesComponent implements OnInit {

  private token: any;
  public sites: any;
  public isDataFound: boolean = false;
  public config: any;
  public pagination_link: any;
  public fadefinished: boolean = false;



  constructor(private _AuthServices: AuthenticationService, private _Router: Router, private _sitesService: SitesService) {

    this.displaySites();

  }



  private getToken() {
    let token: any = this._AuthServices.currentUser.getValue();
    if (token == null) {
      this._Router.navigate(['/home']);

    }
    else {
      this.token = token;


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

  private displaySites() {

    this.getToken();

    this._sitesService.getAllSites(this.token).subscribe((response) => {
      console.log(response)
      this.sites = [];
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
      }
      else if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else {
        this.isDataFound = false;
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
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else

      this.sites = response.data;
    })


  }

  ngOnInit(): void {
  }

}

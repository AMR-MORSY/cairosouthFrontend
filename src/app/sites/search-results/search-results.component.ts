import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { SitesService } from '../sites.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, AfterViewInit {

  public searchStr: any;
  public sites: any;
  public config: any;
  public pagination_link: any;
  public isDataFound: boolean = false;
  public token: any;
  public fadefinished: boolean = false;

  constructor(private _sitesService: SitesService, private _Router: Router, private _AuthServices: AuthenticationService) { }

  public sendSiteId(index: any) {

    let site = this.sites.filter((x: any) => {

      return x.id == index;


    });
    this.goToSiteDetailsWithSite(site);


  }


  public goToSiteDetailsWithSite(site: any) {
    this._sitesService.site.next(site);
    localStorage.setItem("site", JSON.stringify(site));
    this._Router.navigate(['/sites/site-details']);


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

  private displaySites() {

    this._sitesService.searchStr.subscribe(() => {

      if (this._sitesService.searchStr.getValue() != null) {
        this.getToken();
        this.searchStr = this._sitesService.searchStr.getValue();
        this._sitesService.searchSites(this.searchStr, this.token).subscribe((response) => {
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
          else if (response.message=="failed")
          {
            let error=response.errors
            alert(JSON.stringify(error));
          }



          if (response.message == "token expired, please login") {
            alert("token expired, please login");
            this._Router.navigate(['/auth/login']);

          }
          else {
            this.isDataFound = false;
          }
        })
      }

      else {
        this._Router.navigate(['/home']);
      }
    });


  }
  public pageChange(newpage: any) {
    this.config.currentPage = newpage;
    this._sitesService.searchSitesPagination(this.searchStr, this.token, newpage).subscribe((response) => {
      this.sites = response.data;
    })


  }

  ngOnInit(): void {
    this.displaySites();
  }
  ngAfterViewInit(): void {
    let x: any = document.getElementById('loading');
    x.classList.add("animate__animated", "animate__fadeOut");
    setTimeout(() => {
      this.fadefinished = true;
    }, 3000);
  }

}

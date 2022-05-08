import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { SitesService } from '../sites.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public searchStr: any;
  public sites: any;
  public config: any;
  public pagination_link: any;
  public isDataFound: boolean = false;
  public token: any;
  public fadefinished: boolean = false;
  public error:any='';
  public isError:boolean=false;
  public isTokenExpired:boolean=false;
  public showBackButton:boolean=false;

  constructor(private _sitesService: SitesService, private _Router: Router, private _AuthServices: AuthenticationService) { }

  public sendSiteId(index: any) {

    let site = this.sites.filter((x: any) => {

      return x.id == index;


    });
    this.goToSiteDetailsWithSite(site[0]);


  }

private getSearchString()
{
  this._sitesService.searchStr.subscribe(() => {
    if (this._sitesService.searchStr.getValue() != null) {

      this.searchStr = this._sitesService.searchStr.getValue();
      this.getToken();
      this.displaySites();
    }
    else {
      this._Router.navigate(['/home']);
    }
  });

}



  public goToSiteDetailsWithSite(site: any) {
    this._sitesService.site.next(site);



    localStorage.setItem("site", JSON.stringify(site));

    this._Router.navigate(['/sites/site-details']);


  }

  public closeErrorNotification(data:any)
  {
    this.isError=data;
    this.showBackButton=true;

  }


  closeTokenExpirationNotification(data:any)
  {this. isTokenExpired=data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


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
        this._sitesService.searchSites(this.searchStr, this.token).subscribe((response) => {
          console.log(response)


          if (response.message == "token expired, please login") {
            this.error="token expired, please login";
            this.isTokenExpired=true;
            this.isError=false


          }
         else if (response.data!=null) {
            this.isDataFound = true;
            this.isError=false;
            this.isTokenExpired=false;
            this.sites = response.data;

            this.pagination_link = response.links.first;

            this.config = {
              currentPage: response.meta.curent_page,
              itemsPerPage: response.meta.per_page,
              totalItems: response.meta.total
            }
            this.showBackButton=true;

          }
          else if(response.message == "failed")
          {
            this.isDataFound=false;
            this.isError=true;
            this.isTokenExpired=false;

            let error=response.errors
            error=JSON.stringify(error);

             this.error=error;









          }





        })

  }
  public pageChange(newpage: any) {
    this.config.currentPage = newpage;
    this._sitesService.searchSitesPagination(this.searchStr, this.token, newpage).subscribe((response) => {
      this.sites = response.data;
    })


  }

  ngOnInit(): void {
    this.getToken();
    this.getSearchString();

  }


}

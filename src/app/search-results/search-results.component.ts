import { Router } from '@angular/router';
import { SitesService } from './../sites.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

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
  public isDataFound:boolean=false;
  public token:any;

  constructor(private _sitesService: SitesService, private _Router: Router, private _AuthServices:AuthenticationService) { }
  returnback() {


    this._Router.navigate(['/home']);
  }





  public getToken()
  {
    let token:any=this._AuthServices.currentUser.getValue();
    if (token==null)
    {
      this._Router.navigate(['/home']);

    }
    else
    {
      this.token=token;


    }

  }

  displaySites() {

    this._sitesService.searchStr.subscribe(() => {

      if (this._sitesService.searchStr.getValue() != null) {
        this.getToken();
        this.searchStr = this._sitesService.searchStr.getValue();
        this._sitesService.searchSites(this.searchStr,this.token).subscribe((response) => {
          console.log(response)
          this.sites = [];
          if (response.data.length!=0){
            this.sites = response.data;
            this.pagination_link = response.links.first;
            console.log(this.sites);
            this.config = {
              currentPage: response.meta.curent_page,
              itemsPerPage: response.meta.per_page,
              totalItems: response.meta.total
            }
            this.isDataFound=true;
          }
          else
          {
            this.isDataFound=false;
          }
        })
      }

      else {
        this._Router.navigate(['/home']);
      }
    });


  }
  pageChange(newpage: any) {
    this.config.currentPage = newpage;
    this._sitesService.searchSitesPagination(this.searchStr,this.token,newpage).subscribe((response) => {
      this.sites = response.data;
    })


  }

  ngOnInit(): void {
    this.displaySites();
  }

}

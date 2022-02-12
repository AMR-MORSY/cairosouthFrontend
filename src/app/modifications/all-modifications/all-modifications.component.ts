import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ModificationsService } from '../modifications.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-all-modifications',
  templateUrl: './all-modifications.component.html',
  styleUrls: ['./all-modifications.component.scss']
})
export class AllModificationsComponent implements OnInit {

  public isDataFound:boolean=false;
  public config: any;
  public pagination_link: any;
  public token:any;
  public sites:any;
  public id:any;

  public sendSiteId(index:any)
  {
    let site = this.sites.filter((x: any) => {

      return x.id == index;


    });


  }
  public goToCreateNew()
  {
    this._Router.navigate(['/modifications/create-new-modification'])

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



  private displayModifications() {



    this._Modifications.getAllModifications(this.id,this.token).subscribe((response) => {
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

  public pageChange(newpage: any) {
    this.config.currentPage = newpage;
    this._Modifications.getAllModificationsPagination(this.id,this.token, newpage).subscribe((response:any) => {

      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else
      this.sites = response.data;
    })


  }


  constructor(private _Modifications:ModificationsService,private _AuthServices: AuthenticationService, private _Router: Router) { }

  ngOnInit(): void {
    this.getUserData();
    this.displayModifications();
  }

}

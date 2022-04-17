import { SitesService } from 'src/app/sites/sites.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ModificationsService } from '../modifications.service';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {saveAs} from 'file-saver';
import { IndexingContext } from '@angular/compiler-cli/src/ngtsc/indexer';

@Component({
  selector: 'app-all-modifications',
  templateUrl: './all-modifications.component.html',
  styleUrls: ['./all-modifications.component.scss']
})
export class AllModificationsComponent implements OnInit {

  public isDataFound: boolean = false;
  public config: any;
  public pagination_link: any;
  public token: any;
  public sites: any[]=[];
  public id: any;
  public modificationId: any;
  public isModificationClicked: boolean = false;
  public site: any;
  public site_code: any;
  public data:any;
  public columns:any[]=[];
  public index:any[]=[];
  public columnValues:any[]=[];

  public statusForm = new FormGroup({
    status: new FormControl(null, [Validators.required])
  })

  public filterForm = new FormGroup({
    column: new FormControl(null, [Validators.required]),
    columnValue:new FormControl(null, [Validators.required])
  })


  public downloadsites() {
   
    let filename = "allModifications.xlsx";
    this._Modifications.download({ 'filename': filename },this.data,this.id,this.token).subscribe((data) => {


      saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), filename)

    });

  }


  public goToCreateNew() {
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
  public sendSiteId(index: any, e: any, code: any) {
    this.shadeElement(e);
    this.modificationId = index;
    this.site_code = code;
    this.isModificationClicked = true;

  }

  private getChosenMod() {
    let chosenMod = this.sites.filter((mod: any) => {
      return mod.id == this.modificationId
    });

    return chosenMod[0];

  }
  // public submitStatusForm(statusForm: any) {

  //   this.status = statusForm.value.status;

  //   this.displayModifications(this.status)

  // }

  public submitColumn(e:any)
  {
    let column:any=e.target.value;

     for (var i=0;i<this.index.length;i++)
     {
       if (Object.keys(this.index[i])==column)
       {
         this.columnValues=Object.getOwnPropertyDescriptor(this.index[i],column)?.value;
       }
     }


    // console.log(column);
    // console.log(this.columnValues);

  }

 public submitFilterForm(filterForm:any)
  {
    this. data=filterForm.value;
    this.displayModifications();

  }
  private getSiteDataFromDB() {
    this._siteService.searchSites(this.site_code, this.token).subscribe((response) => {

      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);
      }
      else if (response.data != null) {
        this.site = response.data[0];
        console.log(this.site)
        this._siteService.site.next(this.site);
        localStorage.setItem('site', JSON.stringify(this.site))

      }
      else if (response.message=="failed") {

        let error = response.errors
        alert(JSON.stringify(error));
      }
    })

  }




  public goToUpdateModification() {
    this.getSiteDataFromDB();


    let chosenMod = this.getChosenMod();
    this._Modifications.modification.next(chosenMod);
    localStorage.setItem('modification', JSON.stringify(chosenMod))
    this._Router.navigate(['/modifications/update-modifications'])

  }


  private displayModifications() {



    this._Modifications.getAllModifications(this.id, this.token, this.data).subscribe((response) => {
      console.log(response)

       if (response.message == "token expired, please login") {
         alert("token expired, please login");
         this._Router.navigate(['/auth/login']);

       }

       if (response.modifications.data != null) {
         this.sites = response.modifications.data;
         this.pagination_link = response.modifications.links.first;

         this.config = {
           currentPage: response.modifications.curent_page,
           itemsPerPage: response.modifications.per_page,
           totalItems: response.modifications.total
         }
         this.isDataFound = true;
       }

       else {
         let error = response.errors;
         alert(JSON.stringify(error))
         this.isDataFound = false;
       }

    })






  }

  public pageChange(newpage: any) {
    this.config.currentPage = newpage;
    this._Modifications.getAllModificationsPagination(this.data,this.id, this.token, newpage).subscribe((response: any) => {

      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else
        this.sites = response.modifications.data;
    })


  }
  private indexing()
  {
    let keys:any[]=[];
    for (var i=0;i<this.index.length;i++)
    {
      let key:any=Object.keys(this.index[i]);
      keys.push(key[0]);

    }
    this.columns=keys;
    console.log(this.columns);

  }

  private getModiificationAnalysis()
  {
    this._Modifications.getModificationsAnalysis(this.token).subscribe((response)=>{
      console.log(response)
      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else if (response.message=='success')
      {
        this.index=response.index;
        this.indexing();

      }
      else
      {
        let error=response.errors;
        alert(JSON.stringify(error));
      }

    })

  }


  constructor(private _Modifications: ModificationsService, private _AuthServices: AuthenticationService, private _Router: Router, private _siteService: SitesService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getModiificationAnalysis();

  }

}

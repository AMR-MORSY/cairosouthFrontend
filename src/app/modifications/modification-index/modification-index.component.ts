import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from 'src/app/sites/sites.service';
import { ModificationsService } from '../modifications.service';
import { saveAs } from 'file-saver';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-modification-index',
  templateUrl: './modification-index.component.html',
  styleUrls: ['./modification-index.component.scss']
})
export class ModificationIndexComponent implements OnInit {

  public isDataFound: boolean = false;
  public token: any;
  public id: any;
  // public data: any;
  public columns: any[] = [];
  public index: any[] = [];
  public columnValues: any[] = [];
  public isError: boolean = false;
  public error: any = '';
  public isTokenExpired:boolean=false;



  public filterForm = new FormGroup({
    column: new FormControl(null, [Validators.required]),
    columnValue: new FormControl(null, [Validators.required])
  })

  // public downloadsites() {

  //   let filename = "allModifications.xlsx";
  //   this._Modifications.download({ 'filename': filename }, this.data, this.id, this.token).subscribe((data) => {


  //     saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), filename)

  //   });

  // }

  public submitFilterForm(filterForm: any) {
    this._Modifications.modificationIndex.next( filterForm.value);
    this._Router.navigate(['/modifications/all-modifications']);

    // this.displayModifications();

  }

  public submitColumn(e: any) {
    let column: any = e.target.value;

    for (var i = 0; i < this.index.length; i++) {
      if (Object.keys(this.index[i]) == column) {
        this.columnValues = Object.getOwnPropertyDescriptor(this.index[i], column)?.value;
      }
    }


   
  }
  private indexing() {
    let keys: any[] = [];
    for (var i = 0; i < this.index.length; i++) {
      let key: any = Object.keys(this.index[i]);
      keys.push(key[0]);

    }
    this.columns = keys;


  }

  private getModiificationAnalysis() {
    this._Modifications.getModificationsAnalysis(this.id,this.token).subscribe((response) => {

      if (response.message == "token expired, please login") {
        this.error="token expired, please login";
        this.isTokenExpired=true;
        this.isError=false;
        this.isDataFound=false;

      }
      else if (response.message == 'success') {
        this.index = response.index;
        this.isTokenExpired=false;
        this.isError=false;


        this.indexing();

      }
      else {
        let error = response.errors;
        error=JSON.stringify(error);
        this.isTokenExpired=false;
        this.isError=true;
        this.isDataFound=false;
        this.error=error;


      }

    })

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

  constructor(private _Modifications: ModificationsService, private _AuthServices: AuthenticationService, private _Router: Router, private _siteService: SitesService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getModiificationAnalysis();
  }

}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import jwt_decode from "jwt-decode";
import { DatePipe } from '@angular/common';
import { SitesService } from '../sites.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-site',
  templateUrl: './create-new-site.component.html',
  styleUrls: ['./create-new-site.component.scss']
})
export class CreateNewSiteComponent implements OnInit {
  datePickerConfig?: Partial<BsDatepickerConfig>;
  public datepicker: any;
  public hidden: boolean = true;
  public token: any;
  public id: any;
  public isSiteInserted: boolean = false;
  public newSite: any;
  public isSuccess: boolean = false;
  public isTokenExpired: boolean = false;
  public error: any = '';
  public success: any = '';
  public isError: boolean = false;


  public createSiteForm = new FormGroup({
    site_code: new FormControl(null, [Validators.required]),
    site_name: new FormControl(null, [Validators.required]),
    BSC_RNC: new FormControl(null, [Validators.required]),
    office: new FormControl(null, [Validators.required]),
    site_type: new FormControl(null, [Validators.required]),
    site_category: new FormControl(null, [Validators.required]),
    build_date: new FormControl(null, [Validators.required]),
    severity: new FormControl(null, [Validators.required]),
    sharing: new FormControl(null, [Validators.required]),
    host: new FormControl(''),
    two_G: new FormControl(null),
    three_G: new FormControl(null),
    four_G: new FormControl(null),


  })

  constructor(private _SitesServices: SitesService, public datepipe: DatePipe, private _AuthServices: AuthenticationService, private _Router: Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' }, { dateInputFormat: 'YYYY-MM-DD' }, { isAnimated: true });
  }

  closeSuccessNotification(data: any) {
    this.isSuccess = data;
    this.isSiteInserted = false;

  }
  public closeTokenExpirationNotification(data: any) {
    this.isTokenExpired = data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }
  public closeErrorNotification(data: any) {
    this.isError = data;

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
  public closeNotification() {
    this._SitesServices.site.next(this.newSite);
    localStorage.setItem('site', JSON.stringify(this.newSite));
    this.isSiteInserted = true;
    this._Router.navigate(['/sites/site-details']);




  }
  public goToUpdateCascades() {
    this._SitesServices.site.next(this.newSite);
    localStorage.setItem('site', JSON.stringify(this.newSite));
    this._Router.navigate(['/sites/update-cascades']);
    this.isSiteInserted = true;



  }

  private sendNewSiteTODB(site: any, token: any, id: any) {
    let data = {
      'site': site,
      "token": token,
      "id": id
    }



    this._SitesServices.addNewSite(data).subscribe((response: any) => {

      if (response.message == 'failed') {
        let errors = response.errors;
        errors = JSON.stringify(errors);
        this.error = errors;
        this.isError = true;
        this.isTokenExpired=false;
        this.isSuccess=false;

        this.isSiteInserted = false;
      }
      else if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
        this.isSiteInserted = false;
        this.isError = false;
        this.isSuccess=false;


      }
      else {
        alert("New site created Successfully");

        this.newSite = response.site;
        this.isSuccess=true;
        this.success=  "New site created Successfully";
        this.isError = false;
        this.isTokenExpired = false;
      }
    })

  }

  submitCreateSiteForm(data: any) {
    let createdSite: any = data.value;
    let newBuildate = this.datepipe.transform(this.datepicker, 'yyyy-MM-dd')
    createdSite.build_date = newBuildate;
    createdSite = JSON.stringify(createdSite);
    this.getUserData();
    this.sendNewSiteTODB(createdSite, this.token, this.id);







  }

  ngOnInit(): void {

  }

}

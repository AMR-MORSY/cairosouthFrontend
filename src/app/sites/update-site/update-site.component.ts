import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import jwt_decode from "jwt-decode";
import { DatePipe } from '@angular/common';
import { SitesService } from '../sites.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-update-site',
  templateUrl: './update-site.component.html',
  styleUrls: ['./update-site.component.scss']
})
export class UpdateSiteComponent implements OnInit {

  datePickerConfig?: Partial<BsDatepickerConfig>;
  public datepicker:any;
  public hidden: boolean = true;
  public token: any;
  public id: any;
  public isSiteNotInserted: boolean = true;
  public newSite:any;
  public site_id:any;
  public oldSite:any;
  public site_code="";
  public site_name:any;
  public site_BSC="";
  public site_office:any;
  public site_category:any;
  public site_type:any;
  public site_host:any;
  public site_severity:any;
  public site_sharing:any;
  public site_build:any;


  public createSiteForm = new FormGroup({
    site_code: new FormControl(null,[Validators.required]),
    site_name: new FormControl(null,[Validators.required]),
    BSC_RNC: new FormControl(null,[Validators.required]),
    office: new FormControl(null,[Validators.required]),
    site_type: new FormControl(null,[Validators.required]),
    site_category: new FormControl(null,[Validators.required]),
    build_date: new FormControl(null,[Validators.required]),
    severity: new FormControl(null,[Validators.required]),
    sharing: new FormControl(null,[Validators.required]),
    host: new FormControl(''),

  })

  constructor(private _SitesServices: SitesService,public datepipe: DatePipe, private _AuthServices: AuthenticationService, private _Router:Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' }, { dateInputFormat: 'YYYY-MM-DD' }, { isAnimated: true });
    this.getSite();
    console.log(this.site_code)
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
    this.isSiteNotInserted = true;


  }
  public goToUpdateCascades()
  {
    this._SitesServices.site.next(this.newSite);
    localStorage.setItem('site',JSON.stringify( this.newSite));
    this._Router.navigate(['/sites/update-cascades']);
    this.isSiteNotInserted=true;



  }

  private sendNewSiteTODB(site: any, token: any, id: any) {
    let data = {
      'site': site,
      "token": token,
      "id": id
    }

    this._SitesServices.updateSite(data).subscribe((response: any) => {
      console.log(response);
      if (response.message == 'failed') {
        let errors = response.errors;
        alert(JSON.stringify(errors));
        this.isSiteNotInserted=true;
      }
      else if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else
      {this.isSiteNotInserted=false;
        this.oldSite=response.site;
        this._SitesServices.site.next(this.oldSite);
        localStorage.setItem("site", JSON.stringify(this.oldSite))
        this._Router.navigate(['/sites/site-details']);
      }
    })

  }

  submitCreateSiteForm(data: any) {
    let createdSite: any = data.value;

    let newBuildate=this.datepipe.transform(this.datepicker, 'yyyy-MM-dd')
    createdSite.build_date = newBuildate;
    createdSite.site_id=this.site_id;
    console.log(createdSite);

    createdSite = JSON.stringify(createdSite);


    this.getUserData();
    this.sendNewSiteTODB(createdSite, this.token, this.id);







  }
  private getSite() {
    this._SitesServices.site.subscribe(() => {
      this.oldSite = this._SitesServices.site.getValue();
      console.log(this.oldSite);
      this.site_id = this.oldSite.id
      this.site_code=this.oldSite.site_code;
      this.site_name=this.oldSite.site_name;
      this.site_office=this.oldSite.office;
      this.site_severity=this.oldSite.severity;
      this.site_BSC=this.oldSite.BSC_RNC;
      this.site_host=this.oldSite.host;
      this.site_sharing=this.oldSite.sharing;
      this.site_type=this.oldSite.site_type;
      this.site_build=this.oldSite.build_date;
      this.site_category=this.oldSite.site_category
    })
  }

  ngOnInit(): void {


  }



}

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
  


public createSiteForm:any;

  constructor(private _SitesServices: SitesService,public datepipe: DatePipe, private _AuthServices: AuthenticationService, private _Router:Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' }, { dateInputFormat: 'YYYY-MM-DD' }, { isAnimated: true });
    this.getSite();

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


    createdSite = JSON.stringify(createdSite);


    this.getUserData();
    this.sendNewSiteTODB(createdSite, this.token, this.id);







  }
  private getSite() {
    this._SitesServices.site.subscribe(() => {
      this.oldSite = this._SitesServices.site.getValue();

      this.createSiteForm=new FormGroup({
        site_code: new FormControl(this.oldSite.site_code,[Validators.required]),
        site_name: new FormControl(this.oldSite.site_name,[Validators.required]),
        BSC_RNC: new FormControl(this.oldSite.BSC_RNC,[Validators.required]),
        office: new FormControl(this.oldSite.office,[Validators.required]),
        site_type: new FormControl(this.oldSite.site_type,[Validators.required]),
        site_category: new FormControl(this.oldSite.site_category,[Validators.required]),
        build_date: new FormControl(this.oldSite.build_date,[Validators.required]),
        severity: new FormControl(this.oldSite.severity,[Validators.required]),
        sharing: new FormControl(this.oldSite.sharing,[Validators.required]),
        host: new FormControl(this.oldSite.host),
        two_G: new FormControl(this.oldSite.two_G),
        three_G: new FormControl(this.oldSite.three_G),
        four_G: new FormControl(this.oldSite.four_G),
      });
       this.site_id = this.oldSite.id

    })
  }

  ngOnInit(): void {


  }



}

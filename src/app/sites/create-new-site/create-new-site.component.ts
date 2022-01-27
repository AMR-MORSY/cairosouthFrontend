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
  public isSiteNotInserted: boolean = true;
  public newSite:any;


  public createSiteForm = new FormGroup({
    code: new FormControl(null),
    site_name: new FormControl(null,),
    BSC_RNC: new FormControl(null,),
    office: new FormControl(null,),
    site_type: new FormControl(null,),
    site_category: new FormControl(null,),
    build_date: new FormControl(null,),
    severity: new FormControl(null,),
    sharing: new FormControl(null,),
    host: new FormControl(''),

  })

  constructor(private _SitesServices: SitesService,public datepipe: DatePipe, private _AuthServices: AuthenticationService, private _Router:Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' }, { dateInputFormat: 'YYYY-MM-DD' }, { isAnimated: true });
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

    this._SitesServices.addNewSite(data).subscribe((response: any) => {
      console.log(response);
      if (response.message == 'failed') {
        let errors = response.errors;
        alert(JSON.stringify(errors));
        this.isSiteNotInserted=true;
      }
      else
      {this.isSiteNotInserted=false;
        this.newSite=response.site;
      }
    })

  }

  submitCreateSiteForm(data: any) {
    let createdSite: any = data.value;

    let newBuildate=this.datepipe.transform(this.datepicker, 'yyyy-MM-dd')
    createdSite.build_date = newBuildate;
    console.log(createdSite);

    createdSite = JSON.stringify(createdSite);


    this.getUserData();
    this.sendNewSiteTODB(createdSite, this.token, this.id);







  }

  ngOnInit(): void {

  }

}

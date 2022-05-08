import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SitesService } from 'src/app/sites/sites.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import jwt_decode from "jwt-decode";
import { ModificationsService } from '../modifications.service';

@Component({
  selector: 'app-create-new-modification',
  templateUrl: './create-new-modification.component.html',
  styleUrls: ['./create-new-modification.component.scss']
})
export class CreateNewModificationComponent implements OnInit {

  datePickerConfig?: Partial<BsDatepickerConfig>;
  public requestdatepicker: any;
  public finishdatepicker: any;
  public oldSite: any;
  public site_code: any;
  public site_id: any;
  public site_name: any;
  public token: any;
  public id: any;
  public error: any = '';
  public isError: boolean = false;
  public isSuccess:boolean=false;
  public success:any=false;
  public isTokenExpired:boolean=false;


  public createModForm = new FormGroup({


    "subcontractor": new FormControl(null, [Validators.required]),
    "requester": new FormControl(null, [Validators.required]),
    "status": new FormControl("in progress"),
    "request_date": new FormControl(null, [Validators.required]),
    "finish_date": new FormControl(null),
    "cost": new FormControl(null),
    "materials": new FormControl(null),
    "action": new FormControl(null, [Validators.required]),
    "project": new FormControl(null, [Validators.required]),



  })
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


  public closeErrorNotification(data: any) {
    this.isError = data;

  }

  closeSuccessNotification(data:any)

  {
    this.isSuccess=data;

  }
  closeTokenExpirationNotification(data:any)
  {this. isTokenExpired=data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }
  private sendNewModTODB(mod: any, token: any, id: any) {
    let data = {
      'mod': mod,
      "token": token,
      "id": id
    }
    this._ModificationService.creatSiteModification(data).subscribe((response: any) => {
      console.log(response);
      if (response.message == "token expired, please login") {
        this.error="token expired, please login";
        this.isTokenExpired=true;
        this.isError = false;

      }
      else if (response.message == "success") {
        this.success = "Modification inserted Successfully";
        this.isSuccess = true;
        this.isError=false
        this.createModForm=new FormGroup({


          "subcontractor": new FormControl(null, [Validators.required]),
          "requester": new FormControl(null, [Validators.required]),
          "status": new FormControl("in progress"),
          "request_date": new FormControl(null, [Validators.required]),
          "finish_date": new FormControl(null),
          "cost": new FormControl(null),
          "materials": new FormControl(null),
          "action": new FormControl(null, [Validators.required]),
          "project": new FormControl(null, [Validators.required]),



        })

      }
      else if (response.message == "failed") {
        this.isError = true;
        this.isSuccess=false;
        this.isTokenExpired=false;

        let error = response.errors
        error = JSON.stringify(error);

        this.error = error

      }
    })


  }

  constructor(private _SitesServices: SitesService, public datepipe: DatePipe, private _ModificationService: ModificationsService, private _AuthServices: AuthenticationService, private _Router: Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' }, { dateInputFormat: 'YYYY-MM-DD' }, { isAnimated: true });
  }

  public submitCreateModificationForm(data: any) {
    let createdMod: any = data.value;

    let newRequestdate = this.datepipe.transform(this.requestdatepicker, 'yyyy-MM-dd');
    let newFinishdate = this.datepipe.transform(this.finishdatepicker, 'yyyy-MM-dd')
    createdMod.request_date = newRequestdate;
    createdMod.finish_date = newFinishdate;
    createdMod.site_id = this.site_id;
    console.log(createdMod);

    createdMod = JSON.stringify(createdMod);


    this.sendNewModTODB(createdMod, this.token, this.id);



  }
  private getSite() {
    this._SitesServices.site.subscribe(() => {
      this.oldSite = this._SitesServices.site.getValue();
      console.log(this.oldSite);
      this.site_id = this.oldSite.id
      this.site_code = this.oldSite.site_code;
      this.site_name = this.oldSite.site_name;

    })
  }

  ngOnInit(): void {
    this.getSite();
    this.getUserData();
  }

}

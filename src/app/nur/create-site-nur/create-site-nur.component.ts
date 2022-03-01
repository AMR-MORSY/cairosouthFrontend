import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from 'src/app/sites/sites.service';
import jwt_decode from "jwt-decode";
import { NurService } from '../nur.service';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-create-site-nur',
  templateUrl: './create-site-nur.component.html',
  styleUrls: ['./create-site-nur.component.scss']
})
export class CreateSiteNurComponent implements OnInit {


  public oldSite: any;
  public site_id: any;
  public site_code: any;
  public site_name: any;
  public token: any;
  public id: any;
  public newNUR: any;
  public selectedFile: any;

  public createNurForm: any
  public years:number[]=[];





  public selectNurFile(event: any) {

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }

  }



  public submitCreateNurForm(form: FormGroup) {

    let formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('week', this.createNurForm.get('week')?.value);
    formData.append('year', this.createNurForm.get('year')?.value);
    formData.append('technology', this.createNurForm.get('technology')?.value);
    formData.append('id', this.createNurForm.get('id')?.value);
    formData.append('token', this.createNurForm.get('token')?.value);
    formData.append('total_network_cells', this.createNurForm.get('total_network_cells')?.value);
    console.log(formData);


    this.sendNewSiteNURTODB(formData);

  }

  private sendNewSiteNURTODB(nur: any) {


    let data = nur


    this._NURService.createNUR(data).subscribe((response: any) => {
      console.log(response);
      // if (response.message == 'failed') {
      //   let errors = response.errors;
      //   alert(JSON.stringify(errors));

      // }
      // else if (response.message == "token expired, please login") {
      //   alert("token expired, please login");
      //   this._Router.navigate(['/auth/login']);

      // }
      // else {
      //   alert("NUR inserted Successfully");
      //   this.newNUR = response.nur;
      //   this._NURService.NUR.next(this.newNUR);
      //   localStorage.setItem('NUR', JSON.stringify(this.newNUR));


      // }
    })

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
  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;

  }
  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      this.token = this._AuthServices.currentUser.getValue();
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;
      this.createNurForm = new FormGroup({
        id: new FormControl(this.id),
        token: new FormControl(this.token),
        week: new FormControl(null, [Validators.required]),
        technology: new FormControl(null, [Validators.required]),
        file: new FormControl(null, [Validators.required]),
        year: new FormControl(null, [Validators.required]),
        total_network_cells : new FormControl(null, [Validators.required]),

      })

    })

  }

  private creatYearsSellection() {
    let years: number[] = [];
    let currentYear: number = new Date().getFullYear();

    for (var i=0;i<10;i++)
    {
      years.push(currentYear+i)
    }

    this.years=years;

  }
  constructor(private _SitesServices: SitesService, public datepipe: DatePipe, private _AuthServices: AuthenticationService, private _Router: Router, private _NURService: NurService) {

  }

  ngOnInit(): void {
    this.creatYearsSellection();
    this.getSite();
    this.getUserData();
  }

}

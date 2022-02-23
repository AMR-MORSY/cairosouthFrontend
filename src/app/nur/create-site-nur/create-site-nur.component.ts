import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from 'src/app/sites/sites.service';
import jwt_decode from "jwt-decode";
import { NurService } from '../nur.service';
import { DatePipe } from '@angular/common';

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
  public selectedFile:any;


public selectNurFile(event:any){

  this.selectedFile=event.target.files[0];

}

  public createNurForm = new FormGroup({
    week: new FormControl(null,[Validators.required]),
    technology: new FormControl(null,[Validators.required]),
    nur: new FormControl(null,[Validators.required]),


  })

  public submitCreateNurForm(formData: any) {
    let data = formData.value;
    // data.nur=this.selectedFile;
    //  let strData=JSON.stringify(data)

    // data = this.formatingDataBeforSending(data)
     this.sendNewSiteNURTODB(data, this.token, this.id);

  }
  private formatingDataBeforSending(data: any) {
    let newData = data;
    newData.site_id = this.site_id;
    newData.begin=this.datepipe.transform(newData.begin,'yyyy-MM-dd hh:mm:ss' )
    newData.end=this.datepipe.transform(newData.end,'yyyy-MM-dd hh:mm:ss' )
    console.log(newData);
    newData=JSON.stringify(newData);

    return newData;

  }

  private sendNewSiteNURTODB(nur: any, token: any, id: any) {
    let data = {
      'form': nur,
      'nur':this.selectedFile,
      "token": token,
      "id": id
    }
    console.log(data);

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

    })

  }
  constructor(private _SitesServices: SitesService, public datepipe: DatePipe,private _AuthServices: AuthenticationService, private _Router: Router, private _NURService: NurService) { }

  ngOnInit(): void {
    this.getSite();
    this.getUserData();
  }

}

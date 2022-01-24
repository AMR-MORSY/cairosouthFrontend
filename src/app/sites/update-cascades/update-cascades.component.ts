import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from '../sites.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-cascades',
  templateUrl: './update-cascades.component.html',
  styleUrls: ['./update-cascades.component.scss']
})
export class UpdateCascadesComponent implements OnInit {

  public token: any;
  public id: any;
  public site: any;
  public site_id: any;
  public cascadesContainer: any = [];
  public searchRecivedSiteCode = "";
  public isSearchOk: boolean = true;
  public cascade: any;
  public isDataFound: boolean = false;
  public isNoCascades:boolean=true;
  public searchRecivedSiteName = "";
  public nodalCode:any="";
  public nodalName:any="";




  constructor(private _siteService: SitesService, private _Router: Router, private _AuthService: AuthenticationService) { }

  searchCascades = new FormGroup({
    search: new FormControl(null, [Validators.required])
  });
  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;

  }

  private getUserData() {
    this._AuthService.currentUser.subscribe(() => {
      this.token = this._AuthService.currentUser.getValue();
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;


    })
  }
  private getSite() {
    this._siteService.site.subscribe(() => {
      this.site = this._siteService.site.getValue();
      console.log(this.site);
      this.site_id = this.site[0].id
      this.nodalCode=this.site[0].site_Code;
      this.nodalName=this.site[0].site_name;
    })
  }

  private makeCascadeSiteObject(site: any) {
    let casscade = {
      "cascade_code": site.site_Code,
      "cascade_name": site.site_name,
      "nodal_code": this.site[0].site_Code,
      "site_id": this.id
    };
    return casscade;
  }
  private checkTheCascadesCont(casc: any) {
    let cascade = this.cascadesContainer.filter((site: any) => {
      return site.cascade_code == casc.cascade_code;
    });
    if (cascade.length == 0)
      this.cascadesContainer.push(casc);
    else
      alert('already in the list');
  }
  public displaySearchedCascades() {
    this.isDataFound = true;
    this.checkTheCascadesCont(this.cascade)
    console.log(this.cascadesContainer);
    this.searchRecivedSiteCode = '';
    this.searchRecivedSiteName = '';
    this.isSearchOk = true;
  }
  public deleteSite(index: any) {
    this.cascadesContainer.splice(index, 1);
  }
  insertCascadesIntoDB() {
    let Data = {
      "cascades": this.cascadesContainer
    };
    let strData = JSON.stringify(Data);
    let data = {
      "token": this.token,
      "id": this.id,
      "cascades": strData
    }
    console.log(data);
    this._siteService.updateCascades(data).subscribe((response: any) => {

      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);
      }
      if (response.message == "failed") {
        let errors = [];
        errors = response.errors;
        let strError = JSON.stringify(errors);
        let index = strError.indexOf('cascades.')
        if (index == -1) {
          alert(strError);
        }
        else {
          let cascadeNum = getCascadeNum(strError)
          let newError=getNewError(this.cascadesContainer,cascadeNum);
          alert(newError);
        }
        function getCascadeNum(strError: any) {
          let cascadesnuber: any = strError.substring(10, 13);
          let numbers = [];
          for (var i = 0; i < cascadesnuber.length; i++) {
            if (cascadesnuber[i] != ".")
              numbers.push(cascadesnuber[i]);
          }
          let strNumbers = numbers.toString();
          return strNumbers
        }
        function getNewError(cascadesContainer:any, strNumbers:any) {
          let casc = [];
          let site: any = cascadesContainer[Number(strNumbers)];
          console.log(site);
          casc.push(site.cascade_code, site.cascade_name);
          let strCasc: any = JSON.stringify(casc);
          console.log(strCasc);
          let newError = strError.replace(strNumbers, strCasc);
          return newError;
        }
      }
      else if( response.message=="success")
      {
        alert("Cascedes inserted Successfully")
        this._Router.navigate(['/sites/site-detailes']);
      }
    })
  }

  public clearForm() {
    this.cascadesContainer = [];
    this.searchRecivedSiteName = "";
    this.searchRecivedSiteCode = "";
    this.isDataFound = false;
  }

  public searchForCascadeSite(data:any) {

    this._siteService.searchSites(data.value.search, this.token).subscribe((response: any) => {

      if (response.message == "failed") {
        let error: any = response.errors.search[0];
        if (error == null) {
          error = response.errors;
          alert(error)
        }
        else
          alert(error);
      }
      else {
        let searchRecivedSite: any = response.data[0]

        this.isSearchOk = false;
        this.searchRecivedSiteName = searchRecivedSite.site_name;
        this.cascade = this.makeCascadeSiteObject(searchRecivedSite);
      }
      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);
      }
    })
  }
  public fillCascadesContainer()
  {
    this._siteService.cascades.subscribe(()=>{
      if (this._siteService.cascades.getValue()!=null)
      {
        this.cascadesContainer=this._siteService.cascades.getValue();
        this.isNoCascades=false;
      }
      else
      {
        this.isNoCascades=true;

      }
    })
  }


  ngOnInit(): void {
    this.fillCascadesContainer();
    this.getSite();
    this.getUserData();

  }

}




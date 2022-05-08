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
  public deletedCascades: any = [];
  public isCascadesAvailable: boolean = false;
  public searchRecivedSiteName = "";
  public nodalCode: any = "";
  public nodalName: any = "";
  public newCascades: any = [];
  public isInsertedToList: boolean = false;
  public isSuccess: boolean = false;
  public isTokenExpired: boolean = false;
  public error: any = '';
  public success: any = '';
  public isError: boolean = false;




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
      // console.log(this.site);
      this.site_id = this.site.id
      this.nodalCode = this.site.site_code;
      this.nodalName = this.site.site_name;
    })
  }

  private makeCascadeSiteObject(site: any) {
    let casscade = {
      "cascade_code": site.site_code,
      "cascade_name": site.site_name,
      "cascade_id": site.id,
      "nodal_code": this.nodalCode,
      "nodal_id": this.site_id,
      "nodal_name": this.nodalName
    };
    return casscade;
  }

  private makeDeletedNodalObject(site:any)
  {
    let casscade = {
      "cascade_code": site.cascade_code,
      "cascade_name": site.cascade_name,
      "cascade_id": site.cascade_id,
      "nodal_code": this.nodalCode,
      "nodal_id": this.site_id,
      "nodal_name": this.nodalName
    };
    return casscade;

  }
  private checkTheCascadesCont(casc: any) {
    let cascade = this.cascadesContainer.filter((site: any) => {
      return site.cascade_code == casc.cascade_code;
    });
    if (cascade.length == 0) {
      this.cascadesContainer.push(casc);
      this.newCascades.push(casc)
    }
    else
     this.success= 'already in the list';
      this.isSuccess=true;
      this.isError=false;
      this.isTokenExpired=false;
  }
  public displaySearchedCascades() {
    this.isCascadesAvailable = true;
    this.checkTheCascadesCont(this.cascade)

    this.searchRecivedSiteCode = '';
    this.searchRecivedSiteName = '';
    this.isSearchOk = true;
    this.isInsertedToList = true;
  }


  public deleteSite(index: any) {
    this.isInsertedToList = true;

    let deleted = this.cascadesContainer.splice(index, 1);
    let deletedindex = this.newCascades.indexOf(deleted[0]);

    if (deletedindex != -1) {
      this.newCascades.splice(deletedindex, 1);
    }
    else {
      let deletedCascade:any=this.makeDeletedNodalObject(deleted[0])
      this.deletedCascades.push(deletedCascade);


    }

  }


  private fillCascadesArray(casc_Arr: any) {
    let cascades = []
    for (var i = 0; i < casc_Arr.length; i++) {
      cascades.push(casc_Arr[i].cascade_code);
      cascades.push(casc_Arr[i].cascade_name)
    }
    return cascades;
  }
  private displayNewCascadesAlert() {
    if (this.newCascades.length != 0) {
      let cascades = this.fillCascadesArray(this.newCascades)



     this.success= `This will Add ${JSON.stringify(cascades)} to list of cascades of this site`;
      this.isSuccess=true;
      this.isError=false;
      this.isTokenExpired=false;


    }


  }


  private displayDeletedCascadesAlert() {
    if (this.deletedCascades.length != 0) {
      let deletedCascades = this.fillCascadesArray(this.deletedCascades)
      this.success=`This will remove ${JSON.stringify(deletedCascades)} from the list of cascades of this site`;
      this.isSuccess=true;
      this.isError=false;
      this.isTokenExpired=false;

    }
  }
  private formateCascadesData(data_arr: any) {
    let Data = {
      "cascades": data_arr
    };
    let strData = JSON.stringify(Data);
    let data = {
      "token": this.token,
      "id": this.id,
      "cascades": strData
    }
    return data;

  }

  private insertNewcascades(data: any) {
    this._siteService.updateCascades(data).subscribe((response: any) => {


      if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
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
          let newError = getNewError(this.cascadesContainer, cascadeNum);
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
        function getNewError(cascadesContainer: any, strNumbers: any) {
          let casc = [];
          let site: any = cascadesContainer[Number(strNumbers)];
          // console.log(site);
          casc.push(site.cascade_code, site.cascade_name);
          let strCasc: any = JSON.stringify(casc);
          // console.log(strCasc);
          let newError = strError.replace(strNumbers, strCasc);
          return newError;
        }
      }
      else if (response.message == "success") {
       this.success= "Cascedes inserted Successfully";
       this.isSuccess=true;
       this.isError=false;
       this.isTokenExpired=false;
        // this._Router.navigate(['sites/site-details']);
      }
    })


  }
  private deleteCascadesFromDB(data: any) {
    this._siteService.deleteCascades(data).subscribe((response) => {
      // console.log(response);
      if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
      }

      if (response.message == "success") {
        alert("sites deleted successfully")
        this.success= "sites deleted successfully";
        this.isSuccess=true;
        this.isError=false;
        this.isTokenExpired=false;
        // this._Router.navigate(['/sites/site-details'])
      }
      if (response.message == "failed") {
        let error = response.errors;
        error=JSON.stringify(error);
        this.error=error;
        this.isError=true;
        this.isTokenExpired=false;
        this.isSuccess=false;
        this.deletedCascades = [];
      }
    })

  }

  insertCascadesIntoDB() {
    if (this.newCascades.length == 0 && this.deletedCascades == 0) {
      alert('Nothing to cascade')

    }
    if (this.newCascades.length != 0) {
      this.displayNewCascadesAlert()
      let data = this.formateCascadesData(this.newCascades)
      // console.log(data);
      this.insertNewcascades(data)

    }

    if (this.deletedCascades.length != 0) {
      this.displayDeletedCascadesAlert()
      // console.log(this.deletedCascades)
      let data = this.formateCascadesData(this.deletedCascades)
      // console.log(data);
      this.deleteCascadesFromDB(data);
    }

  }

  public clearForm() {
    this.cascadesContainer = [];
    this.searchRecivedSiteName = "";
    this.searchRecivedSiteCode = "";
    this.isCascadesAvailable = false;
  }

  public searchForCascadeSite(data: any) {

    this._siteService.searchSites(data.value.search, this.token).subscribe((response: any) => {

      if (response.message == "token expired, please login") {
        this.error = "token expired, please login";
        this.isTokenExpired = true;
        this.isError = false;
        this.isSuccess=false;
      }
      else if (response.message == "failed") {
        let error: any = response.errors.search[0];
        if (error == null) {
          error = response.errors;
          this.error=error;
          this.isError=true;
          this.isSuccess=false;
          this.isTokenExpired=false;

        }
        else
        this.error=error;
        this.isError=true;
        this.isSuccess=false;
        this.isTokenExpired=false;;
      }
      else {
        let searchRecivedSite: any = response.data[0]

        this.isSearchOk = false;
        this.searchRecivedSiteName = searchRecivedSite.site_name;
        this.cascade = this.makeCascadeSiteObject(searchRecivedSite);
      }

    })
  }



  public fillCascadesContainer() {
    this._siteService.cascades.subscribe(() => {
      this.cascadesContainer = this._siteService.cascades.getValue();
      // console.log(this.cascadesContainer)
      if (this.cascadesContainer.length != 0)
        this.isCascadesAvailable = true;
      else {
        this.isCascadesAvailable = false;

      }


    })
    // console.log(this.isCascadesAvailable)

    this._siteService.nodals.subscribe(() => {

      let nodals: any = this._siteService.nodals.getValue();
      if (nodals.length != 0) {
        for (var i = 0; i < nodals.length; i++) {
          this.cascadesContainer.push(nodals[i])
        }
        this.isCascadesAvailable = true;


      }
      else {
        if (this.isCascadesAvailable == false) {
          this.isCascadesAvailable = false;
        }
      }






    })


  }

  closeSuccessNotification(data: any) {
    this.isSuccess = data;

  }
  public closeTokenExpirationNotification(data: any) {
    this.isTokenExpired = data;
    localStorage.clear();
    this._Router.navigate(['/auth/login']);


  }
  public closeErrorNotification(data: any) {
    this.isError = data;

  }

  ngOnInit(): void {
    this.fillCascadesContainer();
    this.getSite();
    this.getUserData();

  }

}




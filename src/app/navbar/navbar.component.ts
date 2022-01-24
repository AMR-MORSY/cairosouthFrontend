import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

import { AuthenticationService } from './../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SitesService } from '../sites/sites.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean = false;
  public isSuperAdmin:boolean=false;

  public userName: any;
  public profilePic: any;
  public isAdmin: boolean = false;

  public asset_url: string = './assets/grey_avatar_2.png';
  public image_url: any;
  public url: string = "http://localhost:8000/api/login";
  public profile_picture_path: any;
  public backgroundColor:any;

  constructor(private _AuthService: AuthenticationService,  private _sitesService:SitesService, private _Router: Router) { }
  searchForm = new FormGroup({
    search: new FormControl(null, [Validators.requiredTrue])
  })

  SubmitSearchForm(searchForm: any) {
    let search: any = searchForm.value.search;


    if (search != null) {
      this._sitesService.searchStr.next(search);
      localStorage.setItem("searchString", search)
      // let x: any = document.querySelector(".navbar");
      // x.style.display = "none";
      this._Router.navigate(['/sites/search-results']);

    }


  }



  public showUserProperties(decodedToken: any) {

    this.userName = decodedToken.name;

    let role: any = decodedToken.role;
    if ( role == "super admin") {
      this.isAdmin = true;
      this.isSuperAdmin=true;


    }
    else if(role=='admin') {
      this.isSuperAdmin = false;
      this.isAdmin=true;

    }
    else{
      this.isAdmin=false;
      this.isSuperAdmin=false;
    }
    let picture = decodedToken.picture;
    if (picture == null) {
      this.image_url = this.asset_url;
    }
    else {
      this.profile_picture_path = picture;
      this.image_url = `${this.url + this.profile_picture_path}`;

    }


  }

  ngOnInit(): void {

    this._AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() != null) {
        let token: any = this._AuthService.currentUser.getValue();
        this.isLogin=true;
        this.backgroundColor={
          backgroundColor:'none'
        }
        let decodedToken = jwt_decode(token)
        console.log(decodedToken);
        this.showUserProperties(decodedToken);


      }
      else {
        this.isLogin=false;
        this.image_url = this.asset_url;




      }
    })


  }

}

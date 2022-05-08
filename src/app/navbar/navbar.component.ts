import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

import { AuthenticationService } from './../auth/authentication.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SitesService } from '../sites/sites.service';
import { NavigationServiceService } from "../shared-module/navigation-service.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'
  ]
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean = false;

  public isSuperAdmin: boolean = false;

  public userName: any;
  public profilePic: any;
  public isAdmin: boolean = false;
  private menueOpen: boolean = false;
  public asset_url: string = './assets/grey_avatar_2.png';
  public image_url: any;
  public url: string = "http://localhost:8000/api/login";
  public profile_picture_path: any;

  public isAtHomePage: boolean = false;
  public showOffcanvas:boolean=false;


  constructor(private _NavigationService: NavigationServiceService, private _AuthService: AuthenticationService, private _sitesService: SitesService, private _Router: Router) {

  }
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




  public animateBtn(e: any) {

    // let menueBtn:any=e.target;
    let menueBtn: any = document.querySelector('.menue-btn');
    if (!this.menueOpen) {
      menueBtn.classList.add("open");
      this.menueOpen = true;
    }
    else {
      menueBtn.classList.remove("open");
      this.menueOpen = false;
    }



  }












  public showUserProperties(decodedToken: any) {

    this.userName = decodedToken.name;

    let role: any = decodedToken.role;
    console.log(role)

    if (role == "super admin") {
      this.isAdmin = true;
      this.isSuperAdmin = true;


    }
    else if (role == 'admin') {

      this.isAdmin = true;
      this.isSuperAdmin=false;

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

  private getNavigationUrl() {
    this._NavigationService.urlAfterRedirect.subscribe(() => {

      if (this._NavigationService.urlAfterRedirect.getValue() == '/home' || this._NavigationService.urlAfterRedirect.getValue() =='') {
        this.isAtHomePage = true;

      }
      else {
        this.isAtHomePage = false;

      }

    })

  }


  private getUserData()
  {
    this._AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() != null) {
        let token: any = this._AuthService.currentUser.getValue();
        this.isLogin = true;

        let decodedToken = jwt_decode(token)
        console.log(decodedToken);
        this.showUserProperties(decodedToken);


      }
      else {
        this.isLogin = false;
        this.image_url = this.asset_url;




      }
    });

  }

  ngOnInit(): void {


    this.getUserData()

    this.getNavigationUrl();


  }

}

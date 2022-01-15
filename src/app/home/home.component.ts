import { Router } from '@angular/router';
import { SitesService } from './../sites.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public sites: any;
  public isLogin: boolean = false;
  public userEmail: any;



  closeloginMessage() {
    let x: any = document.getElementById("hello-container");
    x.style.display = "none";

  }
  public checkIfLoggin() {
    // let email: any = this._AuthService.user_email.getValue();
    // let storage: any = localStorage.getItem('userEmail');
    // if (email == null && storage == null) {
    // this.isLogin = false;
    // }
    // else if (email == null && storage != null) {
    // this.userEmail = storage;
    // this.isLogin = true;
    // }
    // else if (email != null) {
    // this.userEmail = email;
    // this.isLogin = true;
    // }
  }


  displayLoginMessage() {

    setInterval(() => {

      let x: any = document.getElementById("hello-container");
      x.style.display = "flex";

    }, 5000);

  }

  constructor(private _sitesService: SitesService, private _Router: Router, private _AuthService: AuthenticationService) {
    let x: any = document.querySelector(".navbar");
    x.style.display = "flex";


  }



  ngOnInit(): void {
    // this._AuthService.user_email.subscribe(() => {
    // this.checkIfLoggin();
    // if (!this.isLogin) {
    // this.displayLoginMessage();
    // }

    // })
    // }


  }

  ngAfterViewInit(): void {

    let x:any = document.getElementById('loading');
    x.style.display = "none";
  }


}

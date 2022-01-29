import { NavigationEnd, Router } from '@angular/router';
import { SitesService } from '../sites/sites.service';
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
  public fadefinished: boolean = false;



  closeloginMessage() {
    let x: any = document.getElementById("hello-container");
    x.style.display = "none";

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

    this._Router.events.subscribe((event: any) => {
      let x: any = document.getElementById('loading');

      if (event instanceof NavigationEnd) {

        if (x != null) {
          x.classList.add("animate__animated", "animate__fadeOut");
          setTimeout(() => {
            this.fadefinished = true;

          }, 3000);



        }



      }


    });
  }



  ngOnInit(): void {


    }

  ngAfterViewInit(): void {

      // let x: any = document.getElementById('loading');
      // x.classList.add("animate__animated", "animate__fadeOut");
      // setTimeout(() => {
      //   this.fadefinished = true;

      // }, 3000);


    }







}

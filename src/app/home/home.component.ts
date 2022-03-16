import { NavigationEnd, Router } from '@angular/router';
import { SitesService } from '../sites/sites.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  
  


  }



  ngOnInit(): void {


    }



















}

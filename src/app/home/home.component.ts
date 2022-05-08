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
  public error:any='';
  public isError:boolean=false;



  closeloginMessage() {
    let x: any = document.getElementById("hello-container");
    x.style.display = "none";

  }

  public closeErrorNotification(data: any) {
    this.isError = data;

  }


  displayLoginMessage() {

    setInterval(() => {

      // let x: any = document.getElementById("hello-container");
      // x.style.display = "flex";
      this.isError=true;
      this.error='Please Login to search sites'

    }, 15000);

  }
  private getUserData() {
    this._AuthService.currentUser.subscribe(() => {
     if (this._AuthService.currentUser.getValue()==null)
      this.displayLoginMessage()
    })
  }


  constructor(private _sitesService: SitesService, private _Router: Router, private _AuthService: AuthenticationService) {




  }



  ngOnInit(): void {
    this.getUserData();


    }



















}

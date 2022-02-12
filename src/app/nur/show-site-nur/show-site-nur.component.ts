import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SitesService } from 'src/app/sites/sites.service';

@Component({
  selector: 'app-show-site-nur',
  templateUrl: './show-site-nur.component.html',
  styleUrls: ['./show-site-nur.component.scss']
})
export class ShowSiteNurComponent implements OnInit {

  constructor(private _SitesServices: SitesService,private _AuthServices: AuthenticationService, private _Router:Router) { }
  public goToCreteNur()
  {
    this._Router.navigate(['/nur/create-site-nur']);

  }

  ngOnInit(): void {
  }

}

import { LoaderService } from './loading-screen/loader.service';

import { Component, OnInit, } from '@angular/core';
import { Router, Event, NavigationError, NavigationCancel, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "CairoSouth";

  public isLoading: boolean = false;

  constructor(public _Loader: LoaderService, private _Router: Router) {




  }

  ngOnInit(): void {
    this._Loader.isLoading.subscribe(() => {
      this.isLoading = this._Loader.isLoading.getValue();
    })
    this._Router.events.subscribe((event: any) => {

      if (event instanceof NavigationStart) {
        this.isLoading = true;

      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoading = false;

      }
    });

  }





}












function ngOninit() {
  throw new Error('Function not implemented.');
}


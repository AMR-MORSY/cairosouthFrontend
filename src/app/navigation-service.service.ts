import { NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  private history: any[] = [];
  constructor(private _Router: Router, private _Location:Location) {

    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)

      }
    })
  }
  public back(){
    this.history.pop()
    if (this.history.length>0)
    {
      this._Location.back();
    }
    else
    {
      this._Router.navigate(['/home'])
    }
  }
}

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  private history: any[] = [];
  public urlAfterRedirect=new BehaviorSubject('')
  constructor(private _Router: Router, private _Location:Location) {

    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
        this.urlAfterRedirect.next(event.urlAfterRedirects)

      }
    })
  }
  public back(){

    if (this.history.length>0)
    {
      this._Location.back();
      this.history.pop()
    }
    else
    {
      this._Router.navigate(['/home'])
    }
  }
}

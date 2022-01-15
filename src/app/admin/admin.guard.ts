import { AdminService } from './admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _AdminService: AdminService, private _Router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true
      // this._AdminService.isAdmin.subscribe(()=>{
        // if (this._AdminService.isAdmin.getValue()==true) {
          // return true;
        // }
        // else {
          // this._Router.navigate(['/home']);
          // return false;
        // }

      // });
    }
  }

















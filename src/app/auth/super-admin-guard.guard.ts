import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuardGuard implements CanActivate {

  private role:any='';

  constructor(private _AuthService: AuthenticationService, private _Router: Router) {
    this.getUserData();

  }

  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;

  }
  private getUserData() {
    this._AuthService.currentUser.subscribe(() => {
      if(this._AuthService.currentUser.getValue()!=null)
     { let token:any = this._AuthService.currentUser.getValue();
      let decToken: any = this.decodeToken(token);
      this.role = decToken.role;
     }
     else
     this.role='';

    })

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if(this.role=='super admin')
   {
     return true;
   }

   else
   {
     this._Router.navigate(['/home']);
     return false;
   }
  }

}

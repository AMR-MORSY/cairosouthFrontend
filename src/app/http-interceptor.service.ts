import { LoaderService } from './loading-screen/loader.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  public token:any;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._Loader.isLoading.next(true);
    // const reqWithAuth=req.clone({
      // setHeaders:{
        // Authorization:`Bearer${this.token}`
      // }
    // });

    return next.handle(req).pipe(finalize(()=>{
      this._Loader.isLoading.next(false);

    }));

  }

  constructor(private _AuthService:AuthenticationService, private _Loader:LoaderService) {
    this._AuthService.currentUser.subscribe(()=>{
      this.token=this._AuthService.currentUser.getValue();
    })
   }
}





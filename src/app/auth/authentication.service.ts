import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser = new BehaviorSubject(null);
  // public id=new BehaviorSubject(null);
  // public isAdmin=new BehaviorSubject(false);
  // public isSuperAdmin=new BehaviorSubject(false);



  // private getUserData(token:any)
  // {
  //   let decodedToken:any=this.decodeToken(token);
  //   this.id.next(decodedToken.id);

  //   if (decodedToken.role=='admin')
  //   {
  //     this.isAdmin.next(true)
  //   }
  //  else if (decodedToken.role=='super admin')
  //   {
  //     this.isAdmin.next(true)
  //     this.isSuperAdmin.next(true);
  //   }

  // }
 public saveCurrentUser(token: any) {

    localStorage.setItem('token',token);
    this.currentUser.next(token);
    // this.getUserData(token);
    this._Router.navigate(['/statestics']);



  }
  // private decodeToken(token: any) {
  //   let decToken = jwt_decode(token);
  //   return decToken;

  // }


  constructor(private _HttpClient: HttpClient, private _Router:Router) {

    let storage:any=localStorage.getItem('token');
    if (storage!=null)
    {
      this.currentUser.next(storage);
      // this.getUserData(storage);
    }
   

   }

  signIn(Data: any): Observable<any> {
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/login", Data);
  };

  makeRegisteration(formData: any): Observable<any> {

    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/signup", formData);
  }

  signOut(token:any) {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/logout/${token}`);

  }

  sendPassResEmail(email:any) {
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/sendEmail",email);
  }
  sendPassResForm(passResForm:any) {
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/resetPassword",passResForm);
  }



}

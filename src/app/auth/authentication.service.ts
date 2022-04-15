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



  saveCurrentUser(token: any) {

    localStorage.setItem('token',token);
    this.currentUser.next(token);
    this._Router.navigate(['/user']);


  }

  constructor(private _HttpClient: HttpClient, private _Router:Router) {

    let storage:any=localStorage.getItem('token');
    if (storage!=null)
    {
      this.currentUser.next(storage);
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
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/sendEmail",passResForm);
  }



}

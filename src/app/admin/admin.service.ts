import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public isAdmin=new BehaviorSubject(false);

  constructor(private _http:HttpClient) { }




}

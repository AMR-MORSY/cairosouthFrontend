import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  constructor(private _HttpClient: HttpClient) { }

  getAllUsers(id:any, token:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/showUsers/${id}/${token}`)

  };
  getAllUsersPagination(id:any, token:any, new_page:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/showUsers/${id}/${token}?page=${new_page}`)

  };
}

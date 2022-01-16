import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  public searchStr=new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) {
    let storage:any=localStorage.getItem('searchString')
    if (storage!=null)
    {
      this.searchStr.next(storage)
    }
   }

  showAllSites():Observable<any>
  {
    return this._HttpClient.get("http://localhost:8000/api/sites");

  }

  searchSites(search:any,token:any):Observable<any>{
    return this._HttpClient
    .get(`https://cairo-south.herokuapp.com/api/search/${search}/${token}`);
  }

  searchSitesPagination(search:any,token:any,newpage:any):Observable<any>{
    return this._HttpClient
    .get(`https://cairo-south.herokuapp.com/api/search/${search}/${token}?page=${newpage}`);

  }

  showStatistics(user_token:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/statestics/${user_token}`);
  }


}

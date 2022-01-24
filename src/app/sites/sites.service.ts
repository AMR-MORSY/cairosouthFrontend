import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  public searchStr = new BehaviorSubject(null);
  public site = new BehaviorSubject(null);
  public cascades=new BehaviorSubject(null)


  constructor(private _HttpClient: HttpClient) {

    this.getSearchStr();
    this.getSite();


  }
  private getSite()
  {
    let storag: any = localStorage.getItem('site');
    storag = JSON.parse(storag);
    if (storag != null) {
      this.site.next(storag)
    }
    else
    {
      this.site.next(null)
    }

  }
  private getSearchStr()
  {
    let storage: any = localStorage.getItem('searchString')
    if (storage != null) {
      this.searchStr.next(storage)
    }
    else
    {
      this.searchStr.next(null);
    }

  }

  showAllSites(): Observable<any> {
    return this._HttpClient.get("http://localhost:8000/api/sites");

  }

  searchSites(search: any, token: any): Observable<any> {
    return this._HttpClient
      .get(`https://cairo-south.herokuapp.com/api/search/${search}/${token}`);
  }

  searchSitesPagination(search: any, token: any, newpage: any): Observable<any> {
    return this._HttpClient
      .get(`https://cairo-south.herokuapp.com/api/search/${search}/${token}?page=${newpage}`);

  }

  showStatistics(user_token: any): Observable<any> {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/statestics/${user_token}`);
  }

  getCascades(data:any):Observable<any>{

    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/cascades/${data.site_id}/${data.token}`);
  }
  updateCascades(data:any):Observable<any>{
    return this._HttpClient.post("http://cairo-south.herokuapp.com/api/updateCascades",data);
  }

}

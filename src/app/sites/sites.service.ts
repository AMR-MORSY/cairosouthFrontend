import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SitesService {

  public searchStr = new BehaviorSubject(null);
  public site = new BehaviorSubject(null);
  public cascades=new BehaviorSubject(null)
  public nodals=new BehaviorSubject(null);

  public headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private _HttpClient: HttpClient) {

    this.getSearchStr();
    this.getSite();

    this.getcascades();
    this.getNodals();


  }
  private getSite()
  {
    let storag: any = localStorage.getItem('site');
    storag = JSON.parse(storag);
    if (storag != null) {
      this.site.next(storag)
    }



  }

  private getcascades()
  {
    let storag: any = localStorage.getItem('cascades');
    storag = JSON.parse(storag);
    if (storag != null) {
      this.cascades.next(storag)
    }



  }
  private getNodals()
  {
    let storag: any = localStorage.getItem('nodals');
    storag = JSON.parse(storag);
    if (storag != null) {
      this.nodals.next(storag)
    }



  }
  private getSearchStr()
  {
    let storage: any = localStorage.getItem('searchString')
    if (storage != null) {
      this.searchStr.next(storage)
    }



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

    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/cascades/${data.nodal_id}/${data.token}`);

  }
  getsite(data:any):Observable<any>{
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/site/${data.site_id}/${data.token}`);
  }

  download(data:any):Observable<any>
  {
    const REQUEST_PARAMS=new HttpParams().set('fileName',data.filename);
    const REQUEST_URI="https://cairo-south.herokuapp.com/api/downloadallsites";
    return this._HttpClient.get(REQUEST_URI,{responseType:'arraybuffer',params:REQUEST_PARAMS});
  };


  getNodal(data:any):Observable<any>{

    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/nodal/${data.site_id}/${data.token}`);
  }
  updateCascades(data:any):Observable<any>{
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/updateCascades",data);
  }

  deleteCascades(data:any):Observable<any>{
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/deleteCascades",data);
  }
  deleteSite(data:any):Observable<any>{
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/deletesite",data);
  }
  addNewSite(data:any):Observable<any>{
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/addsite",data,{headers:this.headers});
  };
  updateSite(data:any):Observable<any>{
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/updatesite",data);
  }

  getAllSites(token:any):Observable<any>{

    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/allSites/${token}`);
  }

  allSitesPagination( token: any, newpage: any): Observable<any> {
    return this._HttpClient
      .get(`https://cairo-south.herokuapp.com/api/allSites/${token}?page=${newpage}`);

  }


}

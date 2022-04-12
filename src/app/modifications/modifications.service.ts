import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModificationsService {

  public modification=new BehaviorSubject(null)

  private  getModification()
  {
    let storag: any = localStorage.getItem('modification');
    storag = JSON.parse(storag);
    if (storag != null) {
      this.modification.next(storag)
    }
    else
    {
      this._Router.navigate(['auth/logout']);
    }



  }
  constructor(private _HttpClient: HttpClient,private _Router:Router) {
    this.getModification();



   }

   download(data:any,status:any):Observable<any>
   {
     const REQUEST_PARAMS=new HttpParams().set('fileName',data.filename);
     const REQUEST_URI=`https://cairo-south.herokuapp.com/api/downloadallmodifications/${status}`;
     return this._HttpClient.get(REQUEST_URI,{responseType:'arraybuffer',params:REQUEST_PARAMS});
   };





  getSiteModifications(data:any):Observable<any>
  {
    return this._HttpClient.post('https://cairo-south.herokuapp.com/api/siteModifications',data)

  };
  getAllModifications(id:any, token:any,status:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/modifications/${status}/${id}/${token}`)

  };
  getAllModificationsPagination(status:any,id:any, token:any, new_page:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/modifications/${status}/${id}/${token}?page=${new_page}`)

  };

  deleteSiteModifications(data:any):Observable<any>
  {
    return this._HttpClient.post('https://cairo-south.herokuapp.com/api/deleteMod',data)

  };
  creatSiteModification(data:any):Observable<any>
  {
    return this._HttpClient.post('https://cairo-south.herokuapp.com/api/createMod',data)

  };
  updateSiteModification(data:any):Observable<any>
  {
    return this._HttpClient.post('https://cairo-south.herokuapp.com/api/updateMod',data)

  };
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NurService {




  public NUR=new BehaviorSubject(null);
  public site_code=new BehaviorSubject(null);
  public NURIndex=new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient,private _Router:Router) {
    this.getSiteCode();


  }








   public getSiteCode()
 {
   let storage:any=localStorage.getItem('site_code');
   if(storage!=null){

     this.site_code.next(storage);

   }





 }


  createNUR(data:any):Observable<any>{
     const  headers=new HttpHeaders();
     headers.append('Content-Type',"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    // headers.append('Accept','application/json');
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/createNUR",data,{headers:headers});
  }

  getNURIndex(token:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/nurindex/${token}`)

  }
  getSiteNUR(siteCode:any, token:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/siteNur/${siteCode}/${token}`)
  }

  getAllNUR(data:any,token:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/nurstatestics/${data.week}/${data.month}/${data.year}/${data.tech}/${token}`)

  }
  downloadSiteNur(data:any,siteCode:any,token:any):Observable<any>
  {
    const REQUEST_PARAMS=new HttpParams().set('fileName',data.filename);
    const REQUEST_URI=`https://cairo-south.herokuapp.com/api/downloadSiteNur/${siteCode}/${token}`;
    return this._HttpClient.get(REQUEST_URI,{responseType:'arraybuffer',params:REQUEST_PARAMS});
  };

  downloadNur(file:any,data:any,token:any):Observable<any>
  {
    const REQUEST_PARAMS=new HttpParams().set('fileName',file.filename);
    const REQUEST_URI=`https://cairo-south.herokuapp.com/api/downloadNur/${data.week}/${data.month}/${data.year}/${data.tech}/${token}`;
    return this._HttpClient.get(REQUEST_URI,{responseType:'arraybuffer',params:REQUEST_PARAMS});
  };





}

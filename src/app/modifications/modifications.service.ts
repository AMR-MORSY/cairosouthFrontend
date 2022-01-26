import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ModificationsService {

  constructor(private _HttpClient: HttpClient) { }

  download(data:any):Observable<any>
  {
    const REQUEST_PARAMS=new HttpParams().set('fileName',data.filename);
    const REQUEST_URI="https://cairo-south.herokuapp.com/api/downloadallsites";
    return this._HttpClient.get(REQUEST_URI,{responseType:'arraybuffer',params:REQUEST_PARAMS});
  }
  getSiteModifications(data:any):Observable<any>
  {
    return this._HttpClient.post('https://cairo-south.herokuapp.com/api/siteModifications',data)

  }
}

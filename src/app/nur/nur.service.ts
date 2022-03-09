import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NurService {




  public NUR=new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {
    this.getNUR();
  }

  public getNUR()
  {
    let storage:any=localStorage.getItem('NUR');
    if(storage!=null){
      storage=JSON.parse(storage);
      this.NUR.next(storage);

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

}
